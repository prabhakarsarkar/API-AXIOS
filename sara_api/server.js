const axios = require("axios");
const a = require("readline-sync");


axios.get("http://saral.navgurukul.org/api/courses").then((res) => {
    let course = res.data.availableCourses;
    let arr = []
    for (var i of course) {
        console.log(i.name)
        arr.push(i.id)
    }
    console.log("\n");
    
    let user = a.question("enter the id number")
    var course_id = arr[user - 1]
    // console.log(course_id)


    axios.get("http://saral.navgurukul.org/api/courses/" + course_id + "/exercises").then((resp) => {
        let exercises_course = resp.data.data
        var arr = []
        var count = 0
        for (i of exercises_course) {
            count++
            console.log("id_No", count, ".", i.name)
            arr.push(i.slug)

        }
        console.log("\n");
        

        let slug = a.question("enter slug id")
        let slug_id = arr[slug - 1]
        axios.get("http://saral.navgurukul.org/api/courses/"
            + course_id + "/exercise/getBySlug?slug=" + slug_id).then((data) => {
                console.log(data.data.content);

            })
            .catch((err) => {
                console.log(err + " get thrid mai err hai");

            })

    })
        .catch((err) => {
            console.log(err + " err second get");

        })
})
    .catch((err) => {
        console.log(err + " errer first get")
    });