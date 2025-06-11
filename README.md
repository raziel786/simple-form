# simple-form

This repository contains both the **client** (React) and **server** (Node.js) parts of the project in one place.

<img width="691" alt="Screenshot 2025-05-25 at 22 34 48" src="https://github.com/user-attachments/assets/a3cfcb00-cde2-4389-a0fe-09ca317def9b" />

### Task Summary
The task involved building a system to submit claims via a POST request to an endpoint. While the core requirement was to allow submission, it made sense to also display and track existing claims, enhancing usability and completeness.

Additional considerations included:

Form validation before submission to ensure required fields were populated.

UX refinements, such as avoiding excessive navigation ("Next" buttons) and reducing unnecessary interactions, in line with Fitts's Law.

Backend suggestions like using UUIDs for unique claim identifiers.

Forward-thinking ideas like pagination, claim editing/deletion, and potential for an evidence upload section.

Consideration for scalability to mobile platforms, suggesting a move to Expo for cross-platform support.

### Initial thoughts
Good and enjoyable task - From what I understand it's POST a claim to an endpoint. While its not necessarily mentioned, its good to display and track existing claims submitted.

The initial design shows "next" buttons for each subsection, which I feel is not the best approach in this aspect. While not a UX task, In UX design, Fitts law implies that UI should minimise the distance and number of interactions (like clicks) needed for the user to reach their objective, which ultimately minimises user effort, therefore, the submission button will do its initial checks upon fields to determine if they have been populated. If not, it will not POST a claim.

I'm going to try and timebox myself to an 1.5 hours on this one, otherwise I could see myself polishing this forever, plus I want it to be representative of what I can do with the time I have.

Not counting in the time is project set up and getting a blank React app & Node/Express app running. Rather than bare-metal setup.

### Areas of concern / improvements
 With completing the given task, there are many doors of concerns and improvements from both a UX perspective and operation perspective, these include (but not limited to):
 - Duplicate entries
 - Editing or deleting existing entries caused by user error
 - Rather then using simple IDs in the backend, maybe using something more unique such as a UUID, which could be used as a 'ticket number' for the associated claim.
 - Pagination would need to happen as there could be alot of claims that need to be rendered
 - Potentially an evidence section where users can submit images of the 'accident' or 'other incident' that may have happened to further explain the situation.
 - Thinking beyond the box of a react project, if this needed to be mobile too, I would shift this project to expo, so we get the best of both web and mobile.
 - Add tests for remaining files (hooks, API, other components, and backend too).
## Setup Instructions

### Installation

#### Client
```bash
cd client
yarn install
```
#### Server
```bash
cd server
yarn install
```
### Run Project

#### Client
```bash
cd client
yarn start
```

#### Server
```bash
cd server
yarn start
```

### Run unit tests

```bash
yarn run test
```

<img width="251" alt="Screenshot 2025-05-25 at 22 35 09" src="https://github.com/user-attachments/assets/f23aa75a-82fb-4aa2-9f05-93d824819f79" />

