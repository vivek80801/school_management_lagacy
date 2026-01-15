# School Management System (Legacy)

⚠️ **Legacy / Procedural PHP Version**

This repository contains an **early, half‑finished version** of a school management system built using **procedural PHP**. It was an initial implementation focused on core administrative features, such as student and teacher management, homework, and fee calculations.

This codebase is provided for historical and learning purposes — it helped me understand real business logic implementation before moving to a more modern architecture (like Laravel).

## 🧠 About

This is a legacy code implementation of a school management backend in procedural PHP. It **does not use a modern framework, ORM, or routing layer**, and contains both business logic and presentation logic embedded together.

📌 Because this version was implemented without a framework, it lacks separation of concerns and modern best practices — and that is intentional to document the evolution of my development skills.

## 🚧 Project Status

| Aspect | Status |
|--------|--------|
| Procedural PHP logic | ✔ Partial |
| Fee calculation and student data processing | ✔ |
| Teacher and subject management | Partial |
| Modular design | ✖ No |
| Modern architecture (MVC) | ✖ No |
| Refactored version (Laravel) | 🔜 See `school_management` repository |

## 🔍 Features Implemented

Although incomplete, this legacy version includes:

- Student login and registration
- Teacher login and management
- Fee calculation logic based on student details and fees received
- Basic CRUD‑style pages (login, logout, signup)
- Fee reports and due calculations

> These features exist primarily as code examples of logic implementation — not as a polished product.

## 🚀 Why It’s Here

This repository is kept public as a **legacy project** to show:

✔ Real‑world problem solving in a PHP backend  
✔ How business logic evolves through experience  
✔ The reason for adopting frameworks and better architecture later

This helps demonstrate my development journey and decision‑making process.

> Current & improved versions of this system are available in other repositories (e.g., `school_management` with Laravel and modular design).

## 📌 How to Use (Legacy)

The legacy code expects a typical PHP + MySQL environment:

1. Clone the repository  
2. Set up a web server (Apache / Nginx) with PHP support  
3. Create a database and update `config.php` with your credentials  
4. Import any provided SQL schemas  
5. Navigate to the appropriate pages to use the system

Note: This code **may not run cleanly without some configuration** — it was not intended as a ready‑to‑deploy application.

## 🧾 Disclaimer

This is **not production‑ready code** and is maintained as an educational example of early development work. Future refactoring may be done if time allows.

## 🛠 Related Projects

If you’re interested in a more refined implementation:

- 🔹 **school_management** – A modular Laravel version (ongoing rewrite)  
- 🔹 **laravel-admin-backend-demo** – Backend admin logic in Laravel  
- 🔹 **command-pack** – A Laravel scaffold generator package

---

Thank you for checking out this legacy project! If you have questions or suggestions, feel free to open an issue.

