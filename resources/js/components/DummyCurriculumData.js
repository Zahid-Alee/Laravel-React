export default {
    sections: [{
        id: 1,
        title: "First Section",
        description: "first sec",
        lecturesSorting: "[2,1,3,7,4]", // JSON array of lectures IDs as sorted by instructor
        createdAt: new Date(),
        updatedAt: new Date(),
        lectures: [{ // 
            id: 1, // Primary Key
            section_id: 1, // Foriegn Key
            type: "text", // "audio", "video", "document"
            title: "lecture title",
            description: "some description for the lecture",
            content: "some text if the type is text", // some text if the type is text, null if type is not text
            file_id: 1, // Resourse ID if the type is audio, video or document, null if the type is text
            metaData: "{}", // If required to store additional data with lecture, it will be JSON string
            resoursesSorting: "[2,1,3,7,4]", // JSON array of lectures IDs as sorted by instructor
            publish: true, // false
            createdAt: new Date(),
            updatedAt: new Date(),
            files: [{
                id: 1, // Primary Key
                lecture_id: 1, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 2, // Primary Key
                lecture_id: 1, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 3, // Primary Key
                lecture_id: 1, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            }]
        },{ // 
            id: 2, // Primary Key
            section_id: 1, // Foriegn Key
            title: "lecture title",
            description: "some description for the lecture",
            type: "text", // "audio", "video", "document"
            content: "some text if the type is text", // some text if the type is text, null if type is not text
            media: 1, // Resourse ID if the type is audio, video or document, null if the type is text
            configs: "{}", // If required to store additional data with lecture, it will be JSON string
            publish: true, // false
            resoursesSorting: "[2,1,3,7,4]", // JSON array of lectures IDs as sorted by instructor
            createdAt: new Date(),
            updatedAt: new Date(),
            files: [{
                id: 4, // Primary Key
                lecture_id: 2, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 5, // Primary Key
                lecture_id: 2, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 6, // Primary Key
                lecture_id: 3, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            }]
        }]
    },{
        id: 2,
        title: "First Section",
        description: "first sec",
        lecturesSorting: "[2,1,3,7,4]", // JSON array of lectures IDs as sorted by instructor
        createdAt: new Date(),
        updatedAt: new Date(),
        lectures: [{ // 
            id: 7, // Primary Key
            section_id: 2, // Foriegn Key
            title: "lecture title",
            description: "some description for the lecture",
            type: "text", // "audio", "video", "document"
            content: "some text if the type is text", // some text if the type is text, null if type is not text
            media: 1, // Resourse ID if the type is audio, video or document, null if the type is text
            configs: "{}", // If required to store additional data with lecture, it will be JSON string
            publish: true, // false
            resoursesSorting: "[2,1,3,7,4]", // JSON array of lectures IDs as sorted by instructor
            createdAt: new Date(),
            updatedAt: new Date(),
            files: [{
                id: 7, // Primary Key
                lecture_id: 1, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 8, // Primary Key
                lecture_id: 1, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 9, // Primary Key
                lecture_id: 1, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            }]
        },{ // 
            id: 8, // Primary Key
            section_id: 2, // Foriegn Key
            title: "lecture title",
            description: "some description for the lecture",
            type: "text", // "audio", "video", "document"
            content: "some text if the type is text", // some text if the type is text, null if type is not text
            media: 1, // Resourse ID if the type is audio, video or document, null if the type is text
            configs: "{}", // If required to store additional data with lecture, it will be JSON string
            publish: true, // false
            resoursesSorting: "[2,1,3,7,4]", // JSON array of lectures IDs as sorted by instructor
            createdAt: new Date(),
            updatedAt: new Date(),
            files: [{
                id: 10, // Primary Key
                lecture_id: 2, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 11, // Primary Key
                lecture_id: 2, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            },{
                id: 12, // Primary Key
                lecture_id: 3, // Foriegn Key
                uploader_id: 1, // User ID
                name: "",
                title: "",
                type: "",
                extension: "",
                size: "",
                duration: "",
                tag: "",
                processed: "",
                metaData: "{}", // Additoinal details, if any, for resourse, in JSON String format.
                createdAt: new Date(),
                updatedAt: new Date(),
            }]
        }]
    }]
} 
