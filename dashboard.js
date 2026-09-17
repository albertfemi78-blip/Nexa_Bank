
/* =========================================================
   NEXABANK DASHBOARD JAVASCRIPT
========================================================= */
/* =========================================================
   NEXABANK DASHBOARD JAVASCRIPT
========================================================= */
/* =========================================
   NEXABANK DASHBOARD
========================================= */

document.addEventListener("DOMContentLoaded", () => {

    // Get current logged-in user
    const savedUser =
        localStorage.getItem("currentUser");


    // =========================================
    // CHECK LOGIN
    // =========================================

    if (!savedUser) {

        window.location.href =
            "open-account.html";

        return;
    }


    // Convert JSON back into an object
    const user =
        JSON.parse(savedUser);


    // =========================================
    // USER NAME
    // =========================================

    const welcomeName =
        document.getElementById("welcomeName");

    const userName =
        document.getElementById("userName");


    if (welcomeName) {
        welcomeName.textContent =
            user.fullName;
    }

    if (userName) {
        userName.textContent =
            user.fullName;
    }


    // =========================================
    // ACCOUNT BALANCE
    // =========================================

    const accountBalance =
        document.getElementById("accountBalance");

    if (accountBalance) {

        const balance =
            user.balance ?? 0;

        accountBalance.textContent =
            `₦${Number(balance).toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;

    }

});
// ==========================================
// LOAD REGISTERED USER
// ==========================================

const savedUser = localStorage.getItem("currentUser");

// If no user is logged in, send them back to login
if (!savedUser) {
    window.location.href = "login.html";
}

// Convert saved user data from JSON to JavaScript object
const user = JSON.parse(savedUser);

// ==========================================
// GET USER DETAILS
// ==========================================

const userName = user.fullName || user.name || "NexaBank User";

// ==========================================
// DISPLAY USER'S NAME
// ==========================================

const nameElements = document.querySelectorAll(
    "#userName, #welcomeName, .user-name"
);

nameElements.forEach(element => {
    element.textContent = userName;
});

// ==========================================
// ACCOUNT BALANCE
// ==========================================

// If the user doesn't have a balance yet,
// create one with ₦0
if (user.balance === undefined || user.balance === null) {
    user.balance = 0;

    // Save the updated user back to localStorage
    localStorage.setItem("currentUser", JSON.stringify(user));
}

// ==========================================
// DISPLAY BALANCE
// ==========================================

const balanceElements = document.querySelectorAll(
    "#accountBalance, #balance"
);

balanceElements.forEach(element => {
    element.textContent = `₦${Number(user.balance).toLocaleString("en-NG", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
});

/* =========================================================
   MOBILE SIDEBAR
========================================================= */

const menuButton =
    document.getElementById("menuButton");

const sidebar =
    document.getElementById("sidebar");


if (menuButton && sidebar) {

    menuButton.addEventListener("click", () => {

        sidebar.classList.toggle("show");

        const icon =
            menuButton.querySelector("i");

        if (sidebar.classList.contains("show")) {

            icon.classList.remove("fa-bars");

            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");

            icon.classList.add("fa-bars");

        }

    });

}


/* =========================================================
   LOGOUT
   YOUR ORIGINAL LOGOUT FUNCTION IS PRESERVED
========================================================= */

const logoutBtn =
    document.getElementById("logoutBtn");


if (logoutBtn) {

    logoutBtn.addEventListener("click", () => {

        const confirmLogout =
            confirm("Are you sure you want to logout?");

        if (confirmLogout) {

            window.location.href =
                "open-account.html#login";

        }

    });

}


/* =========================================================
   DARK / LIGHT MODE
========================================================= */

const themeToggle =
    document.getElementById("themeToggle");


const savedTheme =
    localStorage.getItem("nexaTheme");


if (savedTheme === "dark") {

    document.body.classList.add("dark-mode");

}


function updateThemeIcon() {

    if (!themeToggle) return;

    const icon =
        themeToggle.querySelector("i");

    if (
        document.body.classList.contains("dark-mode")
    ) {

        icon.classList.remove("fa-moon");

        icon.classList.add("fa-sun");

        themeToggle.title =
            "Switch to light mode";

    } else {

        icon.classList.remove("fa-sun");

        icon.classList.add("fa-moon");

        themeToggle.title =
            "Switch to dark mode";

    }

}


updateThemeIcon();


if (themeToggle) {

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        const isDark =
            document.body.classList.contains("dark-mode");

        localStorage.setItem(
            "nexaTheme",
            isDark ? "dark" : "light"
        );

        updateThemeIcon();

    });

}


/* =========================================================
   BALANCE SHOW / HIDE
========================================================= */

const balanceToggle =
    document.getElementById("balanceToggle");

const balanceAmount =
    document.getElementById("balanceAmount");


let balanceVisible = true;


if (balanceToggle && balanceAmount) {

    balanceToggle.addEventListener("click", () => {

        const icon =
            balanceToggle.querySelector("i");

        if (balanceVisible) {

            balanceAmount.textContent =
                "₦••••••••";

            icon.classList.remove("fa-eye");

            icon.classList.add("fa-eye-slash");

            balanceToggle.title =
                "Show balance";

            balanceVisible = false;

        } else {

            balanceAmount.textContent =
                "₦2,450,000.00";

            icon.classList.remove("fa-eye-slash");

            icon.classList.add("fa-eye");

            balanceToggle.title =
                "Hide balance";

            balanceVisible = true;

        }

    });

}


/* =========================================================
   COPY ACCOUNT NUMBER
========================================================= */

const copyAccount =
    document.getElementById("copyAccount");


if (copyAccount) {

    copyAccount.addEventListener("click", async () => {

        const accountNumber =
            "2083256745";

        try {

            await navigator.clipboard.writeText(
                accountNumber
            );

            const original =
                copyAccount.innerHTML;

            copyAccount.innerHTML =
                '<i class="fa-solid fa-check"></i> Copied';

            setTimeout(() => {

                copyAccount.innerHTML =
                    original;

            }, 1800);

        } catch (error) {

            alert(
                "Account number: " +
                accountNumber
            );

        }

    });

}


/* =========================================================
   ACTION MODAL
========================================================= */

const actionModal =
    document.getElementById("actionModal");

const modalClose =
    document.getElementById("modalClose");

const modalTitle =
    document.getElementById("modalTitle");

const modalText =
    document.getElementById("modalText");

const modalIcon =
    document.getElementById("modalIcon");

const demoSubmit =
    document.getElementById("demoSubmit");


const actionData = {

    transfer: {

        title: "Transfer Money",

        text:
            "Send money securely to another bank account or NexaBank customer.",

        icon:
            "fa-money-bill-transfer"

    },

    receive: {

        title: "Receive Money",

        text:
            "Generate your account details and receive money from another person.",

        icon:
            "fa-hand-holding-dollar"

    },

    payments: {

        title: "Bill Payments",

        text:
            "Pay electricity, internet, cable TV and other everyday bills.",

        icon:
            "fa-file-invoice-dollar"

    },

    airtime: {

        title: "Airtime & Data",

        text:
            "Purchase airtime and mobile data directly from your banking account.",

        icon:
            "fa-mobile-screen-button"

    },

    cards: {

        title: "Manage Your Card",

        text:
            "View your card information and manage your card settings.",

        icon:
            "fa-credit-card"

    },

    transactions: {

        title: "Transactions",

        text:
            "Review and search through your recent banking activities.",

        icon:
            "fa-clock-rotate-left"

    },

    profile: {

        title: "Profile",

        text:
            "Manage your personal information and account details.",

        icon:
            "fa-user"

    },

    settings: {

        title: "Settings",

        text:
            "Customize your NexaBank dashboard and security preferences.",

        icon:
            "fa-gear"

    },

    support: {

        title: "Help & Support",

        text:
            "Get assistance with your NexaBank account and banking experience.",

        icon:
            "fa-circle-question"

    }

};


/* OPEN ACTION */

function openAction(action) {

    if (!actionModal) return;

    const data =
        actionData[action];

    if (!data) return;

    modalTitle.textContent =
        data.title;

    modalText.textContent =
        data.text;

    modalIcon.innerHTML =
        `<i class="fa-solid ${data.icon}"></i>`;

    actionModal.classList.add("show");

    document.body.style.overflow =
        "hidden";

}


/* CLOSE ACTION */

function closeAction() {

    if (!actionModal) return;

    actionModal.classList.remove("show");

    document.body.style.overflow =
        "";

}


/* ACTION BUTTONS */

document
    .querySelectorAll("[data-action]")
    .forEach(button => {

        button.addEventListener("click", event => {

            event.preventDefault();

            const action =
                button.dataset.action;

            openAction(action);

            if (
                window.innerWidth <= 800 &&
                sidebar
            ) {

                sidebar.classList.remove("show");

                if (menuButton) {

                    const icon =
                        menuButton.querySelector("i");

                    icon.classList.remove(
                        "fa-xmark"
                    );

                    icon.classList.add(
                        "fa-bars"
                    );

                }

            }

        });

    });


/* CLOSE BUTTON */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeAction
    );

}


/* CLICK OUTSIDE */

if (actionModal) {

    actionModal.addEventListener(
        "click",
        event => {

            if (
                event.target === actionModal
            ) {

                closeAction();

            }

        }
    );

}


/* ESCAPE KEY */

document.addEventListener(
    "keydown",
    event => {

        if (event.key === "Escape") {

            closeAction();

        }

    }
);


/* DEMO SUBMIT */

if (demoSubmit) {

    demoSubmit.addEventListener("click", () => {

        alert(
            "No real transaction has been processed."
        );

    });

}


/* =========================================================
   NEW TRANSACTION
========================================================= */

const newTransactionBtn =
    document.getElementById(
        "newTransactionBtn"
    );


if (newTransactionBtn) {

    newTransactionBtn.addEventListener(
        "click",
        () => {

            openAction("transfer");

        }
    );

}


/* =========================================================
   NOTIFICATIONS
========================================================= */

const notificationBtn =
    document.getElementById(
        "notificationBtn"
    );

const notificationPanel =
    document.getElementById(
        "notificationPanel"
    );

const closeNotifications =
    document.getElementById(
        "closeNotifications"
    );


if (notificationBtn && notificationPanel) {

    notificationBtn.addEventListener(
        "click",
        event => {

            event.stopPropagation();

            notificationPanel.classList.toggle(
                "show"
            );

        }
    );

}


if (closeNotifications) {

    closeNotifications.addEventListener(
        "click",
        () => {

            notificationPanel.classList.remove(
                "show"
            );

        }
    );

}


/* CLOSE NOTIFICATIONS OUTSIDE */

document.addEventListener(
    "click",
    event => {

        if (
            notificationPanel &&
            notificationBtn &&
            !notificationPanel.contains(event.target) &&
            !notificationBtn.contains(event.target)
        ) {

            notificationPanel.classList.remove(
                "show"
            );

        }

    }
);


/* =========================================================
   TRANSACTION SEARCH
========================================================= */

const transactionSearch =
    document.getElementById(
        "transactionSearch"
    );

const transactionList =
    document.getElementById(
        "transactionList"
    );


if (
    transactionSearch &&
    transactionList
) {

    transactionSearch.addEventListener(
        "input",
        () => {

            const search =
                transactionSearch.value
                    .toLowerCase()
                    .trim();

            const transactions =
                transactionList.querySelectorAll(
                    ".transaction"
                );

            transactions.forEach(transaction => {

                const text =
                    transaction.textContent
                        .toLowerCase();

                transaction.style.display =
                    text.includes(search)
                        ? "flex"
                        : "none";

            });

        }
    );

}


/* =========================================================
   VIEW ALL TRANSACTIONS
========================================================= */

const viewAllTransactions =
    document.getElementById(
        "viewAllTransactions"
    );


if (viewAllTransactions) {

    viewAllTransactions.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openAction("transactions");

        }
    );

}


/* =========================================================
   CLOSE MOBILE SIDEBAR WHEN CLICKING MAIN CONTENT
========================================================= */

const dashboard =
    document.querySelector(".dashboard");


if (dashboard) {

    dashboard.addEventListener("click", () => {

        if (
            window.innerWidth <= 800 &&
            sidebar
        ) {

            sidebar.classList.remove("show");

            if (menuButton) {

                const icon =
                    menuButton.querySelector("i");

                icon.classList.remove(
                    "fa-xmark"
                );

                icon.classList.add(
                    "fa-bars"
                );

            }

        }

    });

}


/* =========================================================
   CONSOLE MESSAGE
========================================================= */

console.log(
    "NexaBank Dashboard loaded successfully."
);
/* =========================================
   NEXA AI BANKING ASSISTANT
========================================= */

const nexaAiButton =
    document.getElementById("nexaAiButton");

const nexaAiChat =
    document.getElementById("nexaAiChat");

const nexaCloseChat =
    document.getElementById("nexaCloseChat");

const nexaClearChat =
    document.getElementById("nexaClearChat");

const nexaAiInput =
    document.getElementById("nexaAiInput");

const nexaAiSend =
    document.getElementById("nexaAiSend");

const nexaAiMessages =
    document.getElementById("nexaAiMessages");

const nexaAiSuggestions =
    document.getElementById("nexaAiSuggestions");


/* =========================================
   CURRENT TIME
========================================= */

function nexaTime() {

    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });

}


/* =========================================
   OPEN CHAT
========================================= */

if (nexaAiButton) {

    nexaAiButton.addEventListener("click", () => {

        nexaAiChat.classList.add("active");

        nexaAiInput.focus();

    });

}


/* =========================================
   CLOSE CHAT
========================================= */

if (nexaCloseChat) {

    nexaCloseChat.addEventListener("click", () => {

        nexaAiChat.classList.remove("active");

    });

}


/* =========================================
   WELCOME MESSAGE
========================================= */

function nexaWelcomeMessage() {

    nexaAiMessages.innerHTML = `

        <div class="nexa-message ai">

            <div>

                <div class="nexa-message-content">

                    👋 Hi! I'm <strong>Nexa AI</strong>.

                    <br><br>

                    I'm your NexaBank banking assistant. I can
                    guide you through transfers, payments,
                    transactions, cards, loans and more.

                    <br><br>

                    How can I help you today?

                </div>

                <div class="nexa-message-time">
                    ${nexaTime()}
                </div>

            </div>

        </div>

    `;

}


nexaWelcomeMessage();


/* =========================================
   ADD USER MESSAGE
========================================= */

function addUserMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "nexa-message user";

    messageElement.innerHTML = `

        <div>

            <div class="nexa-message-content">

                ${escapeNexaText(message)}

            </div>

            <div class="nexa-message-time">

                ${nexaTime()}

            </div>

        </div>

    `;

    nexaAiMessages.appendChild(
        messageElement
    );

    scrollNexaChat();

}


/* =========================================
   ADD AI MESSAGE
========================================= */

function addAiMessage(message) {

    const messageElement =
        document.createElement("div");

    messageElement.className =
        "nexa-message ai";

    messageElement.innerHTML = `

        <div>

            <div class="nexa-message-content">

                ${message}

            </div>

            <div class="nexa-message-time">

                ${nexaTime()}

            </div>

        </div>

    `;

    nexaAiMessages.appendChild(
        messageElement
    );

    scrollNexaChat();

}


/* =========================================
   ESCAPE USER TEXT
========================================= */

function escapeNexaText(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;

}


/* =========================================
   SCROLL CHAT
========================================= */

function scrollNexaChat() {

    nexaAiMessages.scrollTop =
        nexaAiMessages.scrollHeight;

}


/* =========================================
   TYPING INDICATOR
========================================= */

function showNexaTyping() {

    const typing =
        document.createElement("div");

    typing.className =
        "nexa-message ai";

    typing.id =
        "nexaTyping";

    typing.innerHTML = `

        <div class="nexa-typing">

            <span></span>
            <span></span>
            <span></span>

        </div>

    `;

    nexaAiMessages.appendChild(
        typing
    );

    scrollNexaChat();

}


function removeNexaTyping() {

    const typing =
        document.getElementById("nexaTyping");

    if (typing) {

        typing.remove();

    }

}


/* =========================================
   SMART BANKING RESPONSES
========================================= */

function getNexaResponse(message) {

    const text =
        message.toLowerCase();


    /* TRANSFER */

    if (
        text.includes("transfer") ||
        text.includes("send money") ||
        text.includes("send cash")
    ) {

        return `

            💸 <strong>Making a transfer</strong>

            <br><br>

            To transfer money with NexaBank:

            <br><br>

            1. Open the <strong>Transfer</strong> page.
            <br>
            2. Enter the recipient's details.
            <br>
            3. Enter the amount.
            <br>
            4. Review the transaction.
            <br>
            5. Confirm the transfer.

            <br><br>

            <a href="transfer.html"
               class="nexa-ai-link">

                Go to Transfer →

            </a>

        `;

    }


    /* TRANSACTIONS */

    if (
        text.includes("transaction") ||
        text.includes("transaction history") ||
        text.includes("history")
    ) {

        return `

            📊 <strong>Your Transactions</strong>

            <br><br>

            You can view your recent account activity,
            transaction references, amounts and statuses
            from the Transactions page.

            <br><br>

            You can also click a transaction to view
            its receipt.

            <br><br>

            <a href="transactions.html"
               class="nexa-ai-link">

                View Transactions →

            </a>

        `;

    }


    /* RECEIPT */

    if (
        text.includes("receipt") ||
        text.includes("proof of payment")
    ) {

        return `

            🧾 <strong>Transaction Receipt</strong>

            <br><br>

            Open your Transactions page and click
            the transaction you want to inspect.

            <br><br>

            NexaBank will display the transaction
            details and receipt.

            <br><br>

            <a href="transactions.html"
               class="nexa-ai-link">

                View Transaction History →

            </a>

        `;

    }


    /* PAYMENT */

    if (
        text.includes("payment") ||
        text.includes("bill") ||
        text.includes("electricity") ||
        text.includes("airtime") ||
        text.includes("data")
    ) {

        return `

            💳 <strong>Payments</strong>

            <br><br>

            NexaBank lets you manage your payments
            and bill-related transactions from the
            Payments section.

            <br><br>

            <a href="payments.html"
               class="nexa-ai-link">

                Go to Payments →

            </a>

        `;

    }


    /* CARD */

    if (
        text.includes("card") ||
        text.includes("atm") ||
        text.includes("debit")
    ) {

        return `

            💳 <strong>Your NexaBank Card</strong>

            <br><br>

            You can view your card information,
            card status and card-related options
            from the My Card section.

            <br><br>

            <a href="my-card.html"
               class="nexa-ai-link">

                View My Card →

            </a>

        `;

    }


    /* LOAN */

    if (
        text.includes("loan") ||
        text.includes("borrow") ||
        text.includes("credit")
    ) {

        return `

            💰 <strong>NexaBank Loans</strong>

            <br><br>

            NexaBank offers different financial
            solutions designed to help you manage
            your financial goals.

            <br><br>

            You can explore the loan options from
            the Loans section of the website.

            <br><br>

            <a href="loans.html"
               class="nexa-ai-link">

                Explore Loans →

            </a>

        `;

    }


    /* PROFILE */

    if (
        text.includes("profile") ||
        text.includes("personal information") ||
        text.includes("account details")
    ) {

        return `

            👤 <strong>Your Profile</strong>

            <br><br>

            You can view and manage your personal
            account information from your Profile page.

            <br><br>

            <a href="profile.html"
               class="nexa-ai-link">

                Open Profile →

            </a>

        `;

    }


    /* SETTINGS */

    if (
        text.includes("setting") ||
        text.includes("preferences") ||
        text.includes("password")
    ) {

        return `

            ⚙️ <strong>Account Settings</strong>

            <br><br>

            Your Settings page contains options for
            managing your account preferences and
            security settings.

            <br><br>

            <a href="settings.html"
               class="nexa-ai-link">

                Open Settings →

            </a>

        `;

    }


    /* HELP */

    if (
        text.includes("help") ||
        text.includes("support") ||
        text.includes("problem") ||
        text.includes("issue")
    ) {

        return `

            🆘 <strong>NexaBank Support</strong>

            <br><br>

            I'm happy to guide you. If you need
            additional assistance, visit the
            Help & Support page.

            <br><br>

            <a href="support.html"
               class="nexa-ai-link">

                Contact Support →

            </a>

        `;

    }


    /* ACCOUNT */

    if (
        text.includes("account") ||
        text.includes("open account") ||
        text.includes("create account")
    ) {

        return `

            🏦 <strong>Open a NexaBank Account</strong>

            <br><br>

            You can start your account-opening process
            from the Open Account page.

            <br><br>

            <a href="open-account.html"
               class="nexa-ai-link">

                Open an Account →

            </a>

        `;

    }


    /* SECURITY */

    if (
        text.includes("security") ||
        text.includes("fraud") ||
        text.includes("scam") ||
        text.includes("safe")
    ) {

        return `

            🔐 <strong>Stay Safe</strong>

            <br><br>

            Never share your password, PIN, OTP,
            card CVV or other confidential banking
            information with anyone.

            <br><br>

            If you notice suspicious activity,
            contact NexaBank support immediately.

        `;

    }


    /* HELLO */

    if (
        text.includes("hello") ||
        text.includes("hi") ||
        text.includes("hey")
    ) {

        return `

            👋 Hello!

            <br><br>

            Welcome to <strong>NexaBank</strong>.

            I'm Nexa AI, your banking guide.

            <br><br>

            What would you like help with?

        `;

    }


    /* THANK YOU */

    if (
        text.includes("thank") ||
        text.includes("thanks")
    ) {

        return `

            😊 You're welcome!

            <br><br>

            I'm always here to help you navigate
            NexaBank.

        `;

    }


    /* DEFAULT */

    return `

        🤖 I'm still learning!

        <br><br>

        I can currently help you with:

        <br><br>

        • 💸 Transfers
        <br>
        • 📊 Transactions
        <br>
        • 🧾 Receipts
        <br>
        • 💳 Cards
        <br>
        • 💰 Payments
        <br>
        • 🏦 Accounts
        <br>
        • 💵 Loans
        <br>
        • ⚙️ Settings
        <br>
        • 🔐 Security
        <br>
        • 🆘 Support

        <br><br>

        Try asking me something like:

        <br>

        <strong>"How do I transfer money?"</strong>

    `;

}


/* =========================================
   SEND MESSAGE
========================================= */

function sendNexaMessage(message) {

    message =
        message.trim();

    if (!message) return;


    addUserMessage(message);

    nexaAiInput.value = "";

    showNexaTyping();


    setTimeout(() => {

        removeNexaTyping();

        const response =
            getNexaResponse(message);

        addAiMessage(response);

    }, 800);

}


/* =========================================
   SEND BUTTON
========================================= */

if (nexaAiSend) {

    nexaAiSend.addEventListener(
        "click",
        () => {

            sendNexaMessage(
                nexaAiInput.value
            );

        }
    );

}


/* =========================================
   ENTER KEY
========================================= */

if (nexaAiInput) {

    nexaAiInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                event.preventDefault();

                sendNexaMessage(
                    nexaAiInput.value
                );

            }

        }
    );

}


/* =========================================
   QUICK QUESTIONS
========================================= */

if (nexaAiSuggestions) {

    nexaAiSuggestions
        .querySelectorAll("button")
        .forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const question =
                        button.dataset.question;

                    sendNexaMessage(
                        question
                    );

                }
            );

        });

}


/* =========================================
   CLEAR CHAT
========================================= */

if (nexaClearChat) {

    nexaClearChat.addEventListener(
        "click",
        () => {

            nexaWelcomeMessage();

        }
    );

}


/* =========================================
   CLOSE WITH ESCAPE
========================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            nexaAiChat &&
            nexaAiChat.classList.contains("active")
        ) {

            nexaAiChat.classList.remove(
                "active"
            );

        }

    }
)


    /* ================================================
       MOBILE MENU
    ================================================ */
   {
    const menuButton =
        document.getElementById("menuButton");

    const sidebar =
        document.getElementById("sidebar");
    }

    if (menuButton && sidebar) {

        menuButton.addEventListener("click", () => {

            sidebar.classList.toggle("show");

            const icon =
                menuButton.querySelector("i");

            if (sidebar.classList.contains("show")) {

                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");

            } else {

                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");

            }

        });

    }



    /* ================================================
       QUICK AMOUNTS
    ================================================ */

    const amountInput =
        document.getElementById("transferAmount");

    const quickAmounts =
        document.querySelectorAll("[data-amount]");


    quickAmounts.forEach(button => {

        button.addEventListener("click", () => {

            amountInput.value =
                button.dataset.amount;

        });

    });



    /* ================================================
       TRANSFER FORM
    ================================================ */

    const transferForm =
        document.getElementById("transferForm");

    const transferModal =
        document.getElementById("transferModal");

    const previewRecipient =
        document.getElementById("previewRecipient");

    const previewAmount =
        document.getElementById("previewAmount");


    if (transferForm) {

        transferForm.addEventListener(
            "submit",
            event => {

                event.preventDefault();


                const recipient =
                    document.getElementById(
                        "recipientName"
                    ).value;


                const amount =
                    amountInput.value;


                if (!recipient || !amount) {

                    alert(
                        "Please complete the transfer details."
                    );

                    return;

                }


                previewRecipient.textContent =
                    recipient;


                previewAmount.textContent =
                    "₦" +
                    Number(amount).toLocaleString(
                        "en-NG",
                        {
                            minimumFractionDigits: 2
                        }
                    );


                transferModal.classList.add("show");

                document.body.style.overflow =
                    "hidden";

            }
        );

    }



    /* ================================================
       CLOSE MODAL
    ================================================ */

    const closeTransferModal =
        document.getElementById(
            "closeTransferModal"
        );


    if (closeTransferModal) {

        closeTransferModal.addEventListener(
            "click",
            () => {

                transferModal.classList.remove("show");

                document.body.style.overflow = "";

            }
        );

    }



    /* ================================================
       CONFIRM DEMO
    ================================================ */

   
/* =========================================================
   CONFIRM TRANSFER → TRANSACTION RECEIPT
========================================================= */

const receiptModal = document.getElementById("receiptModal");

const receiptClose = document.getElementById("receiptClose");

const receiptAmount = document.getElementById("receiptAmount");
const receiptRecipient = document.getElementById("receiptRecipient");
const receiptAccount = document.getElementById("receiptAccount");
const receiptBank = document.getElementById("receiptBank");
const receiptNote = document.getElementById("receiptNote");
const receiptDate = document.getElementById("receiptDate");
const receiptReference = document.getElementById("receiptReference");

const downloadReceipt = document.getElementById("downloadReceipt");
const shareReceipt = document.getElementById("shareReceipt");

const backDashboard = document.getElementById("backDashboard");
const anotherTransfer = document.getElementById("anotherTransfer");


if (confirmTransfer) {

    confirmTransfer.addEventListener("click", function () {

        /* Generate unique demo transaction reference */
        const reference =
            "NXB-" +
            Date.now().toString(36).toUpperCase() +
            "-" +
            Math.floor(1000 + Math.random() * 9000);

        /* Current date and time */
        const now = new Date();

        const formattedDate = now.toLocaleString("en-NG", {
            dateStyle: "medium",
            timeStyle: "short"
        });

        /* Format amount */
        const amountValue = Number(transferAmount.value);

        const formattedAmount =
            `₦${amountValue.toLocaleString("en-NG", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })}`;

        /* Fill receipt */
        receiptAmount.textContent = formattedAmount;

        receiptRecipient.textContent =
            recipientName.value.trim() || "NexaBank User";

        receiptAccount.textContent =
            accountNumber.value.trim() || "—";

        receiptBank.textContent =
            bankName.value.trim() || "NexaBank";

        receiptNote.textContent =
            transferNote.value.trim() || "Transfer";

        receiptDate.textContent = formattedDate;

        receiptReference.textContent = reference;

        /* Close confirmation modal */
        transferModal.classList.remove("show");

        /* Open receipt */
        setTimeout(() => {
            receiptModal.classList.add("show");
        }, 200);

    });

}


/* =========================================================
   CLOSE RECEIPT
========================================================= */

if (receiptClose) {

    receiptClose.addEventListener("click", function () {
        receiptModal.classList.remove("show");
    });

}


/* =========================================================
   CLICK OUTSIDE RECEIPT
========================================================= */

if (receiptModal) {

    receiptModal.addEventListener("click", function (event) {

        if (event.target === receiptModal) {
            receiptModal.classList.remove("show");
        }

    });

}


/* =========================================================
   DOWNLOAD RECEIPT
========================================================= */

if (downloadReceipt) {

    downloadReceipt.addEventListener("click", function () {

        const receiptText = `
NEXABANK
TRANSACTION RECEIPT
================================

Status: Successful

Amount Transferred:
${receiptAmount.textContent}

Recipient:
${receiptRecipient.textContent}

Account Number:
${receiptAccount.textContent}

Bank:
${receiptBank.textContent}

Description:
${receiptNote.textContent}

Date & Time:
${receiptDate.textContent}

Transaction Reference:
${receiptReference.textContent}

================================
Frontend Demonstration
No real money was transferred.
        `.trim();

        const blob = new Blob(
            [receiptText],
            { type: "text/plain" }
        );

        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;

        link.download =
            `${receiptReference.textContent}-receipt.txt`;

        document.body.appendChild(link);

        link.click();

        document.body.removeChild(link);

        URL.revokeObjectURL(url);

    });

}


/* =========================================================
   SHARE RECEIPT
========================================================= */

if (shareReceipt) {

    shareReceipt.addEventListener("click", async function () {

        const shareText = `
NexaBank Transaction Receipt

Status: Successful
Amount: ${receiptAmount.textContent}
Recipient: ${receiptRecipient.textContent}
Account: ${receiptAccount.textContent}
Bank: ${receiptBank.textContent}
Date: ${receiptDate.textContent}
Reference: ${receiptReference.textContent}

Frontend demonstration only.
No real money was transferred.
        `.trim();


        /* Devices that support native sharing */
        if (navigator.share) {

            try {

                await navigator.share({
                    title: "NexaBank Transaction Receipt",
                    text: shareText
                });

            } catch (error) {

                console.log("Share cancelled.");

            }

        }

        /* Fallback */
        else {

            try {

                await navigator.clipboard.writeText(shareText);

                alert("Receipt details copied to clipboard.");

            } catch (error) {

                alert("Unable to share receipt.");

            }

        }

    });

}


/* =========================================================
   BACK TO DASHBOARD
========================================================= */

if (backDashboard) {

    backDashboard.addEventListener("click", function () {

        window.location.href = "dashboard.html";

    });

}


/* =========================================================
   ANOTHER TRANSFER
========================================================= */

if (anotherTransfer) {

    anotherTransfer.addEventListener("click", function () {

        receiptModal.classList.remove("show");

        /* Reset form */
        transferForm.reset();

        /* Reset quick amount buttons */
        document
            .querySelectorAll(".quick-amount")
            .forEach(button => {
                button.classList.remove("active");
            });

        /* Return to transfer form */
        setTimeout(() => {

            const transferSection =
                document.querySelector(".transfer-form-card");

            if (transferSection) {

                transferSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        }, 200);

    });

}





    /* ================================================
       CLOSE MODAL OUTSIDE
    ================================================ */

    if (transferModal) {

        transferModal.addEventListener(
            "click",
            event => {

                if (
                    event.target === transferModal
                ) {

                    transferModal.classList.remove(
                        "show"
                    );

                    document.body.style.overflow =
                        "";

                }

            }
        );

    }



    /* ================================================
       DARK MODE
    ================================================ */
    {
    const themeToggle =
        document.getElementById("themeToggle");


    const savedTheme =
        localStorage.getItem("nexaTheme");
   }

    if (savedTheme === "dark") {

        document.body.classList.add(
            "dark-mode"
        );

    }


    function updateThemeIcon() {

        if (!themeToggle) return;

        const icon =
            themeToggle.querySelector("i");


        if (
            document.body.classList.contains(
                "dark-mode"
            )
        ) {

            icon.classList.remove("fa-moon");
            icon.classList.add("fa-sun");

        } else {

            icon.classList.remove("fa-sun");
            icon.classList.add("fa-moon");

        }

    }


    updateThemeIcon();


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            () => {

                document.body.classList.toggle(
                    "dark-mode"
                );


                const isDark =
                    document.body.classList.contains(
                        "dark-mode"
                    );


                localStorage.setItem(
                    "nexaTheme",
                    isDark ? "dark" : "light"
                );


                updateThemeIcon();

            }
        );

    }



    /* ================================================
       LOGOUT
    ================================================ */
    {
    const logoutBtn =
        document.getElementById("logoutBtn");
    }

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            () => {

                const confirmLogout =
                    confirm(
                        "Are you sure you want to logout?"
                    );


                if (confirmLogout) {

                    window.location.href =
                        "open-account.html#login";

                }

            }
        );

    };



