# api/billing.py
import sys
import json

def get_billing_details(email):
    # Mock Database
    billing_db = {
        "customer@example.com": {
            "name": "Ali Ahmed",
            "service": "Business Max Hosting",
            "status": "Active",
            "renewal": "June 15, 2026",
            "balance": "PKR 0"
        },
        "test@zthosting.com": {
            "name": "Sara Khan",
            "service": "cPanel Starter",
            "status": "Pending",
            "renewal": "January 20, 2026",
            "balance": "PKR 1,450"
        }
    }
    
    email = email.lower().strip()
    return billing_db.get(email)

if __name__ == "__main__":
    # Node.js se jo email ayegi wo yahan receive hogi
    user_email = sys.argv[1] if len(sys.argv) > 1 else ""
    result = get_billing_details(user_email)
    
    if result:
        print(json.dumps(result))
    else:
        print("null")