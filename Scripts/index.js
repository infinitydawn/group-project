document.addEventListener("DOMContentLoaded", () => {
    let x = document.querySelector(".test");



    x.addEventListener("click", () => {
        let endpoint = document.querySelector("#endpoint").value;
        console.log(endpoint);
        getData(endpoint);
    })

});


async function getData(endpoint) {
    const url = `http://localhost:3000/${endpoint}`;
    console.log(url)
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const json = await response.json();
        alert(json.message);
        console.log(json.message)
        return json;
    } catch (error) {
        console.error(error.message);
        alert(error.message)
    }
}