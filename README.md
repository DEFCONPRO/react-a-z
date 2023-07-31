# Managing Feedback Editing and Intro to useEffect

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Description

We have a React application that allows users to provide feedback by rating and leaving comments. The main components involved are `FeedbackForm`, `FeedbackList`, `FeedbackItem`, and `Rating`.

1. **Explanation of `useEffect` in `FeedbackForm`**:

In the `FeedbackForm` component, we have the `feedbackEdit` prop being passed down from the parent component (`App`). The prop `feedbackEdit` contains an object with two properties: `item` (representing the feedback item to edit) and `edit` (a boolean indicating whether the form is in edit mode).

> **Note:** Check out the browser's console and notice the logged response from `feedbackEdit`, and observe how it updates when the "Edit" button is clicked.

The `useEffect` hook in `FeedbackForm` is used to update the form fields (`text` and `rating`) when the component mounts and when `feedbackEdit` changes. This is useful when the user clicks the "Edit" button on a feedback item in the list, and the form should be pre-filled with the existing feedback details for editing.

If `feedbackEdit.edit` is `true`, it means the form is in edit mode, and we set the form fields (`setText`, `setBtnDisabled`, and `setRating`) based on the `feedbackEdit.item` properties. This ensures that the form reflects the selected feedback item's details when the user wants to edit it.

**When to use `useEffect`**: We use `useEffect` in this scenario to handle side effects (in this case, updating form fields) when certain dependencies change. In this case, the effect runs whenever the `feedbackEdit` prop changes, which allows us to update the form fields accordingly.

2. **Explanation of `feedbackEdit` prop in `Rating`**:

In the `Rating` component, the `feedbackEdit` prop is passed down from the `FeedbackForm`. It is used to set the initial value of the `selected` state, which represents the current rating selected by the user.

The `useEffect` in the `Rating` component is responsible for updating the `selected` state whenever the `feedbackEdit` prop changes. This ensures that when the user switches from editing one feedback item to another, the rating selection in the `Rating` component reflects the rating of the selected feedback item.

**Why `useEffect` is used in `Rating` and not in `FeedbackForm`**: The reason we have the `useEffect` in `Rating` instead of `FeedbackForm` is that the `Rating` component is used for both adding new feedback and editing existing feedback. So, we need to ensure that the `selected` state, which represents the current rating selection, is updated based on the feedback item being edited.

3. **Explanation of `handleEditFeedback` prop in `FeedbackList`**:

In the `FeedbackList` component, the `handleEditFeedback` function is passed down from the parent component (`App`). This function is used to handle the editing of a feedback item.

When the user clicks the "Edit" button in a feedback item (`FeedbackItem` component), the `handleEditButton` function is called, which, in turn, calls the `handleEditFeedback` function, passing the selected `item` as an argument. This allows the parent component (`App`) to know which feedback item is being edited.

**Why `handleEditFeedback` is passed to `FeedbackList`**: By passing down `handleEditFeedback` to `FeedbackList`, we enable the `FeedbackItem` component to interact with the parent component (`App`) and trigger the editing process when the "Edit" button is clicked.

## Installation

To run the project on your local machine, follow these steps:

1. Clone the repository: `git clone https://github.com/techstackmedia/react-front-to-back`
2. Navigate to the project directory: `cd react-front-to-back`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`

## Usage

`useEffect` is a React Hook that allows you to perform side effects in functional components. Side effects can be tasks like data fetching, subscriptions, or manually changing the DOM. It is used to manage component lifecycle and perform certain actions after the component has rendered or re-rendered.

### `useEffect` with an array of dependencies:

```jsx
useEffect(() => {
  // Side effect logic
}, [dependency1, dependency2, ...]);
```

When you provide an array of dependencies as the second argument to `useEffect`, it means the effect will only be re-executed when the values of the dependencies change. If any of the dependencies remain the same between renders, the effect won't be triggered again. It helps optimize the performance and prevents unnecessary re-execution of the effect.

### Explanation of code:

1. In the `FeedbackForm` component:

   ```jsx
   const FeedbackForm = ({ handleAddItem, feedbackEdit }) => {
     // ... other states and functions ...

     useEffect(() => {
       if (feedbackEdit.edit === true) {
         setBtnDisabled(false);
         setText(feedbackEdit.item.text);
       }
     }, [feedbackEdit]);
     // ...
   };
   ```

   - The `FeedbackForm` component receives two props: `handleAddItem` and `feedbackEdit`.
   - The `useEffect` hook is used to handle the side effect. It is triggered whenever the `feedbackEdit` prop changes.
   - When `feedbackEdit.edit` is true, it enables the submit button (`setBtnDisabled(false)`) and sets the text input's value to `feedbackEdit.item.text` (if `feedbackEdit.edit` is false, the button remains disabled).

2. In the `Rating` component:

   ```jsx
   const Rating = ({ selectedRating, feedbackEdit }) => {
     // ... other states and functions ...

     useEffect(() => {
       setSelected(feedbackEdit.item.rating);
     }, [feedbackEdit]);
     // ...
   };
   ```

   - The `Rating` component receives two props: `selectedRating` and `feedbackEdit`.
   - The `useEffect` hook is used to handle the side effect. It is triggered whenever the `feedbackEdit` prop changes.
   - It sets the `selected` state to the `feedbackEdit.item.rating` value, allowing the component to display the rating based on the provided `feedbackEdit`.

3. In the `FeedbackList` component:

   ```jsx
   const FeedbackList = ({
     feedback,
     handleDeleteFeedback,
     handleEditFeedback,
   }) => {
     // ...
   };
   ```

   - The `FeedbackList` component receives three props: `feedback`, `handleDeleteFeedback`, and `handleEditFeedback`.
   - These props are passed down to the `FeedbackItem` component to handle delete and edit actions on individual feedback items.

4. In the `FeedbackItem` component:

   ```jsx
   const FeedbackItem = ({
     item,
     handleDeleteFeedback,
     handleEditFeedback,
   }) => {
     const handleEditButton = () => {
       handleEditFeedback(item);
     };

     // ... other code ...
   };
   ```

   - The `FeedbackItem` component receives three props: `item`, `handleDeleteFeedback`, and `handleEditFeedback`.
   - When the "Edit" button is clicked, the `handleEditFeedback` function is called with the `item` prop as an argument. This allows the parent component (`App`) to handle the edit action for the selected feedback item.

In summary, the `useEffect` hooks in the `FeedbackForm` and `Rating` components are used to initialize the component states based on the `feedbackEdit` prop passed down from the parent component. The `handleEditFeedback` function is passed down through the `FeedbackList` component and used in the `FeedbackItem` component to handle the edit action for individual feedback items.

The `FeedbackForm` component is used for adding new feedback and editing existing feedback, with `useEffect` used to set form fields when editing. The `Rating` component handles the rating selection, and `useEffect` is used to update the selected rating when the feedback item to edit changes. The `FeedbackList` component displays the list of feedback items and handles the interactions with the parent component (`App`) to perform edit and delete operations.

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
