# 1 - High Level Diagram

![HLD](assets/Deliciae_HLD.jpeg)

1. There are two types of users: **Author** and **Viewer.**
   1. There can only be one strict **Author** user.
   2. Whereas, there can be N number of **Viewers**.
2. **Authentication** and **Authorization**, both are based on vanilla **JSON Web Token** and **Bcrypt** for hasing.
   1. For **Author**, we use Email and Password as authentication measure.
   2. For **Viewer**, we use Name and generate a unique username as authentication measure.
   3. In client, authentication **token** are stored in a persistent state.
3. A page is a markdown that stores the content posted by the **Author**.
   1. Content are mostly markdown texts, callouts, images, videos.
   2. Contents can be of a bigger size so we use a **BLOB storage** like (**AWS S3 Bucket** or **Supabase Storage**) to save the page’s content and **store the path** and **content link** to the **database**.
   3. A parent page can have multiple nested pages which are cascading by default when parent page makes any changes.
   4. For faster retrieval of every types of pages we use **Redis** as the **caching** server.
4. **Viewers** can not only read a post content but also comment on a post in the **Discussion** section.
   1. If a Viewer is using profanity or slurs on comments of the post, Author can **ban** that particular **Viewer** from commenting.
   2. **Author** can also reply to the **Viewers** comment \***\*in the **Discussion\*\* section.
   3. For faster retrieval every comments of a page we use **Redis** as the **caching** server.
   4. **Author** can also send private messages to a **Viewer**, about new release change logs, news, personal messages, etc.
5. **Settings** is the management place for all types of users.
   1. **Author** can see all the data, trash, viewers, messages, comments, replies on comments, banned users, delete account options and logout option.
   2. **Viewers** can see all the viewers, messages from author, their own comments, delete account option and logout option.
   3. For faster retrieval we use Redis as the caching server for all settings features.
