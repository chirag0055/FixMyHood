# FixMyHood

FixMyHood is a community-driven issue reporting system that allows users to report and track municipal problems like potholes, garbage, and broken streetlights. The platform includes an admin panel for monitoring complaints and provides real-time status updates.

## Features

### User:

- **Report Issues:** Users can submit complaints with descriptions and images.
- **Track Complaint Status:** Users can check the progress of their submitted complaints.

### Admin Panel:

- **View Complaints:** Displays all complaints in a structured table format.
- **Update Status:** Admins can change the status of complaints, which reflects dynamically.
- **Statistical Overview:** Provides complaint statistics based on their resolution status.
- **Filter by Location & Status:** Complaints can be filtered by state, city, and status.

## Tech Stack

### Frontend:

- **React (Vite):** Fast and modular development.
- **Tailwind CSS:** For responsive and modern UI.
- **Hero UI:** For pre-designed UI components.

### Backend:

- **Firebase:** For authentication and real-time database.
- **Firestore:** To store and manage complaints.

## Installation and Setup

### Prerequisites:

- Node.js
- Firebase Account

### Steps:

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/FixMyHood.git
   cd FixMyHood
   ```
2. **Set up Firebase:**
   - Create a Firebase project and enable Firestore.
   - Obtain Firebase credentials and update the `.env.local` file.
3. **Install Dependencies:**
   ```bash
   npm install
   ```
4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

## Project Structure

```
FixMyHood/
|-- src/
|   |-- components/
|   |-- pages/
|   |-- firebase.js
|   |-- App.jsx
|-- public/
|-- .env.local
|-- package.json
|-- tailwind.config.js
|-- README.md
```

## Future Enhancements

- Implement role-based access control for admins.
- Add push notifications for status updates.
- Improve search and filter functionality.

## Contributing

Contributions are welcome! Fork the repository and submit a pull request for review.

## Contact

For any queries or support, reach out:

- **Email:** chiraggoyal9646@gmail.com
- **GitHub:** github.com/chirag0055
