function getClientStatus(email) {
    const testClients = {
        "test@zthosting.com": {
            service: "Premium Shared Hosting",
            renewal: "2026-05-15",
            pending_invoices: 1
        },
        "sir@zthosting.com": {
            service: "Dedicated Server (Custom)",
            renewal: "2026-12-01",
            pending_invoices: 0
        }
    };

    const cleanEmail = email.toLowerCase().trim();
    if (testClients[cleanEmail]) {
        return { status: "success", ...testClients[cleanEmail] };
    } else {
        return { status: "error", message: "No active service found for this email." };
    }
}

module.exports = { getClientStatus };