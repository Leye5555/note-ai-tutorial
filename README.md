Feature: Best Note-Taking App in the World

Scenario: Create a new note
Given the user is on the main dashboard of the note-taking app
When the user clicks the "New Note" button
Then the app should create a blank note
And allow the user to start typing immediately

Scenario: Organize notes into folders
Given the user has created multiple notes

<!-- CRUD operations already in place -->
<!-- Create,Read, Update, Delete -->

When the user selects one or more notes
And the user clicks the "Move to folder" button
Then the app should allow the user to organize notes into custom folders
And the app should display these folders on the sidebar for easy navigation

Scenario: Sync notes across devices
Given the user has logged into the app on multiple devices
When the user creates or edits a note on one device
Then the app should automatically sync the changes to all other devices
And the note should appear updated instantly

Scenario: Share notes with others
Given the user has created a note
When the user clicks the "Share" button
Then the app should generate a shareable link or provide sharing options via email, messaging, or social media
And the recipient should have view or edit access based on the user's preferences

Scenario: Search notes by keywords
Given the user has several notes saved in the app
When the user enters a keyword in the search bar
Then the app should display all notes that contain the keyword
And highlight the keyword in the results

Scenario: Handwritten note support with stylus
Given the user has a touchscreen device with a stylus
When the user selects the "Handwriting" mode
Then the app should allow the user to write notes by hand
And convert handwritten text to digital text if needed

Scenario: Voice-to-text note creation
Given the user prefers to dictate notes
When the user selects the "Voice-to-text" option
And the user speaks into the microphone
Then the app should transcribe the speech into text in real-time
And save the transcribed text as a note

Scenario: Note version history and recovery
Given the user has made changes to a note
When the user clicks on the "Version History" option
Then the app should display all previous versions of the note
And allow the user to restore a previous version if needed

Scenario: Add tags to notes for better organization
Given the user has created a note
When the user clicks on the "Add Tag" button
Then the app should allow the user to add one or more tags to the note
