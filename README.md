# Feedback Application using JSON Server VS MongoDB Atlas Backend

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

The key difference between the two versions of the code when using JSON Server and when getting the response from the backend (in this case, MongoDB Atlas) lies in how the backend responds to the frontend requests, particularly in how the `id` property of the feedback items is handled.

### When using JSON Server

- JSON Server automatically generates an `id` property for each item in the JSON response. These `id` properties are simple numeric values (e.g., 1, 2, 3, ...).
- In the `FeedbackContext`, you are directly using this automatically generated `id` property to uniquely identify and update the feedback items in the `feedback` state array.

```jsx
const updateFeedback = async (id, itemUpdate) => {
  // ... fetch and update logic ...
  setFeedback((prevFeedback) =>
    prevFeedback.map((item) => {
      return item.id === id ? { ...item, ...data } : item;
    })
  );
};
```

### When using a Backend with MongoDB Atlas

- With MongoDB Atlas, the `id` property of each feedback item is represented by the `_id` property generated by MongoDB. The `_id` property is an object identifier (ObjectId) in MongoDB, which is a complex type.
- In the `FeedbackList` component, you are now using the `_id` property instead of the `id` property to uniquely identify the feedback items.

```jsx
{
  feedback.map((feedbackItem) => {
    return <FeedbackItem item={feedbackItem} key={feedbackItem._id} />;
  });
}
```

The key difference in the two versions is how the `id` property is represented and used. In the JSON Server version, `id` is a simple numeric value, while in the MongoDB Atlas version, `_id` is a more complex ObjectId.

To make the MongoDB Atlas version work correctly, you made the following changes:

- Modified the `FeedbackItem` component to use `feedbackItem._id` as the key.
- In the `updateFeedback` function in `FeedbackContext`, use `item._id` instead of `item.id` to match the feedback item with the correct `_id` from the backend.

These changes were necessary because the MongoDB `_id` is a more complex data type, and it needs to be handled appropriately when updating the feedback items in the state.

Please refer to the repository's README.md for further details and troubleshooting tips. Happy coding!

## Installation

To run the project on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/techstackmedia/react-front-to-back`
2. Navigate to the project directory: `cd react-front-to-back`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`

## Usage

To access the backend code that uses Express.js and Mongoose to connect to MongoDB Atlas, please visit the repository at [feedback-application-server](https://github.com/techstackmedia/feedback-application-server). You can find detailed instructions in the README.md file on how to set up and run the backend server.

Here are the steps to get started:

1. Clone the Repository:

   ```bash
   git clone https://github.com/techstackmedia/feedback-application-server.git
   cd feedback-application-server
   ```

2. Read the README.md:
   Take your time to read the README.md file in the repository. It contains important information about installing dependencies, setting up the MongoDB Atlas connection, and running the server.

3. Set Up MongoDB Atlas:
   Make sure you have a MongoDB Atlas account and create a cluster where your data will be stored. The README.md will guide you through setting up the connection to MongoDB Atlas in the server.

4. Install Dependencies:
   Run the following command to install the required dependencies for the backend server:

   ```bash
   npm install
   ```

5. Run the Backend Server:
   To start the backend server locally, use the following command:

   ```bash
   npm start
   ```

   If you prefer to test the application locally with the frontend, you can keep the proxy in the frontend's package.json file. It is useful during development to avoid CORS issues when making API requests.

6. Remove Proxy for Deployment (Optional):
   If you plan to deploy the backend and frontend separately, you can remove the proxy configuration from the frontend's package.json file. This is necessary when using a secure URL for the API in the deployed environment.

7. Adjust Proxy Port (Optional):
   By default, the proxy in the frontend's package.json is set to `http://localhost:5000`, which matches the backend's default port. If you wish to run the backend server on a different port, make sure to adjust the proxy in the package.json to the corresponding port.

Now you have the backend code up and running, and it is connected to the MongoDB Atlas database. The frontend should communicate with the backend API seamlessly, allowing you to test the complete application locally or deploy it to your preferred hosting service.

**Note:**
When deploying the backend, ensure that you have the necessary environment variables and their corresponding values set in the `.env` file on the deployment platform. However, it is important to never set the backend's port in the environment variable of your deploying platform. This caution also applies to the frontend.

Below is an example of having the API URL in the environment variable, whether locally or in a deploying platform's environment variable:

```txt
REACT_APP_URL_API=https://feedback.api.onrender.com/feedback # This is a randomly generated URL.
```

Make sure to use the prefix `REACT_APP` in your environment variables for your front-end React application.

By following this practice, you can avoid potential issues and ensure a successful deployment of your application.

Please refer to the repository's README.md for further details and troubleshooting tips.

Happy coding!

## Contributing

If you'd like to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature/new-feature`.
3. Make your changes and commit them: `git commit -m "Add some feature"`.
4. Push to the branch: `git push origin feature/new-feature`.
5. Create a pull request.

Please make sure to follow the project's coding guidelines and conventions when contributing.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
