# Author Stories

## 1.1 - Manage 1 strict author account

1. As an **Author** I want to have a one strict account with the encrypted password so that nobody can login and access the **CMS**.
2. I want **signing up** to be completely restricted to other users except me, application **must not be able to add more than one user** if the user is **Author**.
3. I want to have an authentication based on **email and password** which I will use for logging in. 
4. A viewer **is not allowed** to access this feature.

## 1.2 - Posting Content

1. As an **Author** I want to post content as a blog. 
2. There are markdown content with optional picture and video contents as well.
3. Only I must post the content, no one else has access to posting content but myself.
4. I want content in such way that, **A page has a children page nested** in it and it goes on like a **tree**.
5. There are two types of content posts:
    1. **Public**: This can be viewed by anyone unverified viewer.
    2. **Private**: Viewer must be authenticated/verified to view certain content posts.
6. I can save content as a **draft/unreleased** and also **release** it to make it viewable.
7. I want to **save my unsaved content as checkpoints**, so that, if I **lose access to computer**, I can still later continue my work without hassle of starting over again.
8. A viewer **is not allowed** to access this feature.

## 1.3 - Viewing all sorts of Contents

1. As an **Author**, I want to have a sorted library according to the types of content.
2. This includes **Public, Private, Unreleased, Released, Trash** contents.
3. I want this to be fetched fast and in a paginated manner.
4. I also want to see **list of properly nested pages** with their **icon and title** and when I click a page, I want to see all the contents inside of that particular page.
5. I want a **three-dot action trigger** such that, when triggered it shows options of **Editing and Deleting**.
6. If I update **title and icon** of the **parent page**, I want it to be updated in **children pages** as well and **likewise** for the **delete** action.
7. A viewer **is allowed** to access this feature but **without any actions**.

## 1.4 - Viewing contents of a page

1. As an **Author**, I would like to have a page that views my content in a markdown. 
2. It should have a **title, icon** and contents which includes a **markdown + media**.
3. I want to see **lists** of the **nested children pages** of that **parent page**.
4. **Likewise** for **children page**, show all the **parent page tree** in a **breadcrumb**.
5. A viewer **is allowed** to access this feature.

## 1.5 - Update content of a page

1. As an **Author**, I want to trigger update functionality when I either trigger **three-dots** or go **inside a page**.
2. I do not want a complex way to update contents, just load the existing content then I will edit over the existing content.
3. As I am typing there are chances that I might lose access to computer because of electricity or network issues, so just like posting content, I want to have a checkpoint save, so in case I lose access I can still later continue where I had left.
4. Update feature must also update the **title and icon** of the **parent page from the children pages**.
5. A viewer **is not allowed** to access this feature.

## 1.6 - Delete a page

1. As an **Author**, I want to trigger delete functionality when I either trigger **three-dots**.
2. It should pop up a **dialog** for **confirmation**.
3. Once confirmed, it will **not permanently delete the page**. Rather it will send it to **Trash**. 
4. I want it to stay in **Trash for 14 days**, once the **condition is satisfied**, **delete it permanently from the Trash**.
5. If I wanna **permanently delete** it, I can also do it **manually** by **triggering three-dots** next to page in **Trash**. 
6. For deleting, it will pop up a **dialog**, warning me that it will **not be able to backup later**. Once I hit **I consent**, **delete it permanently**.
7. A viewer **is not allowed** to access this feature.

## 1.7 - Viewing all viewers

1. As an **Author**, I want to view all the users in a table.
2. It should show me their **name, joining date, all the comments** and a **three-dot option menu**.
3. If I select **Message**:
    1. I can message that particular viewer.
4. If I select **Ban Viewer**:
    1. I can ban the viewer from the application.
5. A viewer **is not allowed** to access this feature.

## 1.8 - Messaging my Viewer/s

1. As an **Author** and also the **Product Engineer** behind this application, I would like to message **my Viewer/s**.
2. I can send them any **private message** so that makes it **1-1 message**.
3. I can send **all of them any message** that is related to **news or updates** in the application.
4. I do not want messages to **editable**, but messages can be **deleted permanently** from both end of users.
5. A viewer **is allowed** to access this feature but can only **read the messages** from the **Author**.

## 1.9 - Banning a Viewer

1. As an **Author**, ****I do not want a viewer to **comment with profanity messages** on a **post**.
2. So once I read the comment and find it inappropriate, I can ban that viewer from the application.
3. When I **ban the viewer**, I want viewer to **still see the contents of the application** but **commenting is off** and **access to contents are limited**.
4. I want a feature that can convince me to unban a viewer.
    1. Once banned, viewer can have a chance to explain themselves and apologize to the author.
    2. If I find that apology pleasing, I can unban the viewer.
    3. Though, viewer cannot apologize for 2nd time, this should strictly be 1 time only.
5. A viewer **is not allowed** to access this feature **except when it’s banned then it can send an apology message**.

## 1.10 - Settings (Profile Management)

1. As an **Author**, I want my own personal space where I can manage inside stuffs related to my profile.
2. I want dedicated spaces to view used space in the database where I can manage:
    1. Number of contents posted.
    2. Number of viewers.
    3. Update my profile feature.
    4. Delete profile feature.
    5. Logout feature.
    6. And more…
3. A viewer **is not allowed** to access this feature.