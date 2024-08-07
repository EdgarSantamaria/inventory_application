# Inventory Management Application
This project is an inventory management web application built using Next.js, Firebase Firestore, and Material-UI. This application allows users to search, add, update, and delete items.

# Features
- View a list of inventory items
- Add new items to the inventory
- Updates items in the inventory
- Delete an item from the inventory
- Search for items in the inventory

# Adding Items
1. Click on the "Add New Item" button.
2. Enter the name of the item in the text field.
3. Click the "Add" button.
# Removing Items
1. Click the "Remove" button next to the item you want to remove.
2. The quantity of the item will decrease by one. If the quantity reaches zero, the item will be removed from the inventory.
# Deleting Items
1. Click the "Delete" button next to the item you want to delete.
2. The item will be completely removed from the inventory.
# Searching for Items
1. Enter a search term in the "Search Inventory" text field.
2. The list of items will be filtered based on the search term.

## Prerequisites

To build and run this application, you will need the following:

### Software Requirements

- [Node.js](https://nodejs.org/) (v20 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Firebase account](https://firebase.google.com/)

### Dependencies

- **Next.js**: React framework for rendering and generating static websites.
- **Firebase**: Platform for building web and mobile applications, used here for Firestore (database) and Firebase Authentication.
- **Material-UI (MUI)**: React component library for building user interfaces.
- **Firestore**: NoSQL database from Firebase, used for storing inventory data.
