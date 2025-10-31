// Give Online Page Functionality

let selectedGivingType = 'tithe';
let selectedPaymentMethod = 'paystack';
let selectedAmount = null;

// NOTE: In production, load these from a secure server-side endpoint or environment configuration
// Never commit real API keys to version control
// These are placeholders - replace with your actual keys from a secure configuration
const PAYSTACK_PUBLIC_KEY = window.PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxxxxxxxxxx'; // Replace with actual key
const FLUTTERWAVE_PUBLIC_KEY = window.FLUTTERWAVE_PUBLIC_KEY || 'FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx'; // Replace with actual key

// Giving Type Selection
document.querySelectorAll('.giving-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.giving-option').forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        selectedGivingType = option.dataset.type;
        
        // Show/hide other purpose field
        const otherPurposeGroup = document.getElementById('other-purpose-group');
        if (selectedGivingType === 'other') {
            otherPurposeGroup.style.display = 'block';
            document.getElementById('purpose').required = true;
        } else {
            otherPurposeGroup.style.display = 'none';
            document.getElementById('purpose').required = false;
        }
    });
});

// Amount Button Selection
document.querySelectorAll('.amount-btn').forEach(button => {
    button.addEventListener('click', () => {
        const amount = button.dataset.amount;
        
        document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        
        if (amount === 'custom') {
            document.getElementById('amount').value = '';
            document.getElementById('amount').focus();
            selectedAmount = null;
        } else {
            document.getElementById('amount').value = amount;
            selectedAmount = parseInt(amount);
        }
    });
});

// Payment Method Selection
document.querySelectorAll('.payment-method').forEach(method => {
    method.addEventListener('click', () => {
        document.querySelectorAll('.payment-method').forEach(m => m.classList.remove('selected'));
        method.classList.add('selected');
        selectedPaymentMethod = method.dataset.method;
    });
});

// Form Submission
document.getElementById('giving-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const amount = parseInt(document.getElementById('amount').value);
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const recurring = document.getElementById('recurring').checked;
    const purpose = selectedGivingType === 'other' ? document.getElementById('purpose').value : selectedGivingType;
    
    if (!amount || amount < 100) {
        showToast('Please enter a valid amount (minimum ₦100)', 'warning');
        return;
    }
    
    // Store donation record in Firebase
    const donationData = {
        amount: amount,
        type: selectedGivingType,
        purpose: purpose,
        name: name,
        email: email,
        phone: phone,
        recurring: recurring,
        paymentMethod: selectedPaymentMethod,
        status: 'pending',
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    try {
        let donationRef;
        if (typeof db !== 'undefined') {
            donationRef = await db.collection('donations').add(donationData);
        }
        
        // Proceed with payment
        if (selectedPaymentMethod === 'paystack') {
            initiatePaystackPayment(amount, email, name, phone, donationRef ? donationRef.id : null);
        } else {
            initiateFlutterwavePayment(amount, email, name, phone, donationRef ? donationRef.id : null);
        }
    } catch (error) {
        console.error('Error processing donation:', error);
        showToast('An error occurred. Please try again.', 'error');
    }
});

// Paystack Payment Integration
function initiatePaystackPayment(amount, email, name, phone, reference) {
    const handler = PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email: email,
        amount: amount * 100, // Convert to kobo
        currency: 'NGN',
        ref: reference || 'FT-' + Math.floor((Math.random() * 1000000000) + 1),
        metadata: {
            custom_fields: [
                {
                    display_name: "Donor Name",
                    variable_name: "donor_name",
                    value: name
                },
                {
                    display_name: "Phone Number",
                    variable_name: "phone",
                    value: phone
                },
                {
                    display_name: "Giving Type",
                    variable_name: "giving_type",
                    value: selectedGivingType
                }
            ]
        },
        callback: function(response) {
            handlePaymentSuccess(response.reference, response.status);
        },
        onClose: function() {
            showToast('Payment cancelled', 'info');
        }
    });
    
    handler.openIframe();
}

// Flutterwave Payment Integration
function initiateFlutterwavePayment(amount, email, name, phone, reference) {
    FlutterwaveCheckout({
        public_key: FLUTTERWAVE_PUBLIC_KEY,
        tx_ref: reference || 'FT-' + Date.now(),
        amount: amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: email,
            phone_number: phone,
            name: name,
        },
        customizations: {
            title: 'Faith Tabernacle Donation',
            description: selectedGivingType.charAt(0).toUpperCase() + selectedGivingType.slice(1),
            logo: 'https://faithtabernacle.org/assets/images/logo.png',
        },
        callback: function (data) {
            if (data.status === "successful") {
                handlePaymentSuccess(data.tx_ref, data.status);
            } else {
                showToast('Payment failed. Please try again.', 'error');
            }
        },
        onclose: function() {
            showToast('Payment cancelled', 'info');
        }
    });
}

// Handle Payment Success
async function handlePaymentSuccess(reference, status) {
    showToast('Payment successful! Thank you for your generosity.', 'success');
    
    // Update donation record in Firebase
    if (typeof db !== 'undefined') {
        try {
            await db.collection('donations').doc(reference).update({
                status: 'completed',
                paymentReference: reference,
                completedAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        } catch (error) {
            console.error('Error updating donation record:', error);
        }
    }
    
    // Reset form
    document.getElementById('giving-form').reset();
    document.querySelectorAll('.giving-option').forEach(opt => opt.classList.remove('selected'));
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
    document.querySelector('.giving-option[data-type="tithe"]').classList.add('selected');
    
    // Show thank you message
    setTimeout(() => {
        showThankYouModal();
    }, 1000);
}

// Show Thank You Modal
function showThankYouModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-body" style="text-align: center; padding: var(--spacing-3xl);">
                <i class="ri-checkbox-circle-line" style="font-size: 5rem; color: var(--primary-gold);"></i>
                <h2 style="margin: var(--spacing-lg) 0;">Thank You!</h2>
                <p style="font-size: 1.125rem; margin-bottom: var(--spacing-xl);">
                    Your generous gift has been received. May the Lord bless you abundantly for your faithfulness and support of His work.
                </p>
                <p style="color: var(--gray-600);">
                    A receipt has been sent to your email address.
                </p>
                <button class="btn btn-primary" onclick="this.closest('.modal').remove()" style="margin-top: var(--spacing-lg);">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Auto-close after 10 seconds
    setTimeout(() => {
        if (modal.parentNode) {
            modal.remove();
        }
    }, 10000);
}

// Format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
    }).format(amount);
}

// Update amount display on input
document.getElementById('amount').addEventListener('input', (e) => {
    selectedAmount = parseInt(e.target.value) || 0;
    document.querySelectorAll('.amount-btn').forEach(btn => btn.classList.remove('selected'));
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Set default values
    selectedGivingType = 'tithe';
    selectedPaymentMethod = 'paystack';
    
    // Note: In production, load API keys from secure configuration
    if (PAYSTACK_PUBLIC_KEY === 'pk_test_xxxxxxxxxxxxxxxxxxxxx') {
        console.warn('⚠️ Paystack public key not configured. Please add your Paystack public key in give.js');
    }
    
    if (FLUTTERWAVE_PUBLIC_KEY === 'FLWPUBK_TEST-xxxxxxxxxxxxxxxxxxxxx') {
        console.warn('⚠️ Flutterwave public key not configured. Please add your Flutterwave public key in give.js');
    }
});
