// Landing Page Calculator Script with Enhanced Admin ID Capture
document.addEventListener('DOMContentLoaded', function() {
    // ========================================
    // ✅ CRITICAL: CAPTURE ADMIN ID FROM URL
    // ========================================
    const urlParams = new URLSearchParams(window.location.search);
    const adminId = urlParams.get('admin');
    
    // Enhanced admin ID validation and storage
    if (adminId && adminId !== '' && adminId !== 'undefined' && adminId !== 'null') {
        // Store admin ID in both sessionStorage and localStorage for redundancy
        sessionStorage.setItem('selectedAdminId', adminId);
        localStorage.setItem('selectedAdminId', adminId);
        console.log('✅ Admin ID captured from URL:', adminId);
        console.log('✅ Stored in sessionStorage and localStorage');
        
        // Visual confirmation (optional - you can remove this)
        console.log('%c🎯 ADMIN ASSIGNED: ' + adminId, 'background: #4CAF50; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
    } else {
        console.log('⚠️ No admin ID in URL - will use auto-assignment');
        // Don't clear existing admin ID - user might be navigating within the app
        // Only clear if explicitly no admin parameter
        if (window.location.search && !adminId) {
            console.log('🔄 Clearing previous admin assignment');
            sessionStorage.removeItem('selectedAdminId');
            localStorage.removeItem('selectedAdminId');
        }
    }
    
    // ========================================
    // LOAN CALCULATOR
    // ========================================
    const calcSlider = document.getElementById('calcSlider');
    const calcAmount = document.getElementById('calcAmount');
    const calcTerm = document.getElementById('calcTerm');
    const monthlyPaymentDisplay = document.getElementById('monthlyPayment');
    const totalRepaymentDisplay = document.getElementById('totalRepayment');
    
    // Annual interest rate
    const annualRate = 0.12; // 12% APR
    
    // Function to calculate loan
    function calculateLoan() {
        const amount = parseFloat(calcAmount.value) || 5000;
        const term = parseInt(calcTerm.value) || 12;
        const monthlyRate = annualRate / 12;
        
        // Calculate monthly payment using loan formula
        const monthlyPayment = amount * monthlyRate * Math.pow(1 + monthlyRate, term) / 
                              (Math.pow(1 + monthlyRate, term) - 1);
        
        const totalRepayment = monthlyPayment * term;
        
        // Update displays with P currency
        if (monthlyPaymentDisplay) {
            monthlyPaymentDisplay.textContent = '$' + Math.round(monthlyPayment).toLocaleString();
        }
        
        if (totalRepaymentDisplay) {
            totalRepaymentDisplay.textContent = '$' + Math.round(totalRepayment).toLocaleString();
        }
    }
    
    // Sync slider and input
    if (calcSlider && calcAmount) {
        calcSlider.addEventListener('input', function() {
            calcAmount.value = this.value;
            calculateLoan();
        });
        
        calcAmount.addEventListener('input', function() {
            const value = Math.max(500, Math.min(50000, this.value || 5000));
            this.value = value;
            calcSlider.value = value;
            calculateLoan();
        });
    }
    
    // Term change
    if (calcTerm) {
        calcTerm.addEventListener('change', calculateLoan);
    }
    
    // Initial calculation
    calculateLoan();
    
    // ========================================
    // SMOOTH SCROLL FOR NAVIGATION
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // ========================================
    // ✅ APPLY NOW BUTTON HANDLER
    // ========================================
    const applyButtons = document.querySelectorAll('.apply-btn, .cta-button, [href="application.html"]');
    
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Get the stored admin ID (check both storages)
            const storedAdminId = sessionStorage.getItem('selectedAdminId') || 
                                 localStorage.getItem('selectedAdminId');
            
            // Generate application ID
            const applicationId = 'APP-' + Date.now();
            
            // Store comprehensive application data
            const applicationData = {
                applicationId: applicationId,
                timestamp: new Date().toISOString(),
                adminId: storedAdminId,
                createdAt: new Date().toLocaleString('en-GB', { timeZone: 'Africa/Gaborone' })
            };
            
            // Store in sessionStorage
            sessionStorage.setItem('applicationData', JSON.stringify(applicationData));
            
            // Also backup in localStorage
            localStorage.setItem('lastApplicationData', JSON.stringify(applicationData));
            
            // Enhanced logging
            console.log('📋 Application created:', applicationId);
            console.log('📅 Timestamp:', applicationData.timestamp);
            
            if (storedAdminId) {
                console.log('👤 Assigned to admin:', storedAdminId);
                console.log('%c✅ ADMIN ASSIGNMENT CONFIRMED', 'background: #2196F3; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            } else {
                console.log('👤 Will be auto-assigned by server');
                console.log('%c⚠️ AUTO-ASSIGNMENT MODE', 'background: #FF9800; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
            }
        });
    });
    
    // ========================================
    // DEBUG INFO ON PAGE LOAD
    // ========================================
    const currentAdminId = sessionStorage.getItem('selectedAdminId') || 
                          localStorage.getItem('selectedAdminId');
    
    console.log('═══════════════════════════════════════');
    console.log('🦁 MAX IT BW LANDING PAGE INITIALIZED');
    console.log('═══════════════════════════════════════');
    console.log('📍 Current URL:', window.location.href);
    console.log('🔗 Query String:', window.location.search);
    console.log('👤 Admin ID from URL:', adminId || 'NONE');
    console.log('💾 Stored Admin ID:', currentAdminId || 'NONE');
    
    if (currentAdminId) {
        console.log('%c🎯 ACTIVE ASSIGNMENT: ' + currentAdminId, 'background: #4CAF50; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
    } else {
        console.log('%c⚠️ NO ASSIGNMENT - WILL AUTO-ASSIGN', 'background: #FF9800; color: white; padding: 5px 10px; border-radius: 3px; font-weight: bold;');
    }
    console.log('═══════════════════════════════════════');
    
    // ========================================
    // ADMIN LINK VERIFICATION
    // ========================================
    // This helps you verify the links are working correctly
    if (adminId) {
        // Create a small visual indicator (optional - can be removed)
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #4CAF50;
            color: white;
            padding: 10px 20px;
            border-radius: 8px;
            font-size: 12px;
            font-weight: bold;
            z-index: 9999;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            animation: fadeIn 0.3s ease-in;
        `;
        indicator.textContent = '✅ Admin: ' + adminId;
        
        // Add to page
        document.body.appendChild(indicator);
        
        // Remove after 5 seconds
        setTimeout(() => {
            indicator.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => indicator.remove(), 300);
        }, 5000);
        
        // Add simple CSS animations
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes fadeOut {
                from { opacity: 1; transform: translateY(0); }
                to { opacity: 0; transform: translateY(20px); }
            }
        `;
        document.head.appendChild(style);
    }
});


// Live Approval Popup JavaScript for Airtel Congo (DRC) - Expanded Data with 4 Hidden Digits
const names = [
    "Jean M.", "Grace K.", "Christian N.", "Marie T.", "Patient B.",
    "David L.", "Sarah M.", "Patrick K.", "Esther N.", "Plamedi B.",
    "Dieumerci S.", "Rachel K.", "Junior M.", "Aime T.", "Jovial P.",
    "Divine K.", "Exaucée N.", "Jonathan B.", "Chantal M.", "Gloire K."
];

const prefixes = ["99", "97", "98", "81", "82", "83"];

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateAirtelNumber() {
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomEnd = Math.floor(10 + Math.random() * 90);
    // Hiding the middle 4 digits using ****
    return `+243 ${prefix} **** ${randomEnd}`;
}

function generateApprovalData() {
    return names.map(name => {
        // Random amount between $500 and $50,000
        const amount = getRandomNumber(500, 50000);
        const formattedAmount = "$" + amount.toLocaleString();
        
        // Random time simulation
        const timeOptions = ["Just now", "1 minute ago", "2 minutes ago", "3 minutes ago", "4 minutes ago"];
        const time = timeOptions[Math.floor(Math.random() * timeOptions.length)];

        return {
            name: name,
            phone: generateAirtelNumber(),
            amount: formattedAmount,
            time: time
        };
    });
}

const approvalData = generateApprovalData();

function showRandomApproval() {
    const popup = document.getElementById('popup');
    const popupText = document.getElementById('popup-text');
    const popupTime = document.getElementById('popup-time');
    const popupAvatar = document.getElementById('popup-avatar');

    if (!popup || !popupText || !popupTime || !popupAvatar) return;

    const randomItem = approvalData[Math.floor(Math.random() * approvalData.length)];
    
    popupAvatar.textContent = randomItem.name.charAt(0);
    popupText.innerHTML = `<strong>${randomItem.name}</strong> (${randomItem.phone}) successfully approved <strong>${randomItem.amount}</strong>`;
    popupTime.textContent = randomItem.time;

    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 4000);
}

// Trigger popup loop
window.addEventListener('DOMContentLoaded', () => {
    setInterval(() => {
        showRandomApproval();
    }, 8000);

    setTimeout(() => {
        showRandomApproval();
    }, 3000);
});
