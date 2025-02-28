const access_key = "rztfLv4GiR-2HaGV0yLOQHE8KBc7N8JcTJE2KjvG7Ow";

const input_text = document.querySelector("form");
const show_more_results = document.getElementById("show_more_results");
const results_container = document.getElementById("all_search_res_container");

let page = 1;
let search_data = "";

export async function load_more_images () {
    search_data = input_text.querySelector("#input_text").value;

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search_data}&client_id=${access_key}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        const results = data.results;
        console.log(data);

        if (page === 1) {
            results_container.textContent = "";
        }

        results.map((result) => {
            const content_container = document.createElement("div");
            content_container.classList.add("search_container");

            const image_container = document.createElement("div");
            image_container.classList.add("image");

            const image = document.createElement("img");
            image.src = result.urls.small;
            image.alt = result.alt_description;

            const text_content_container = document.createElement("div");
            text_content_container.classList.add("img_text");

            const text = document.createElement("p");
            if( result.alt_description == null) {
                text.textContent = `Photo of a ${search_data}.`
            }
            else {
                text.textContent = result.alt_description;
            }

            image_container.appendChild(image);
            text_content_container.appendChild(text);
            content_container.appendChild(image_container);
            content_container.appendChild(text_content_container);

            results_container.appendChild(content_container);

            
        });

        page++;

        if (page > 1) {
            show_more_results.style.display = "block";
        }

    } catch (error) {
        alert(error);
    }
}

input_text.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    load_more_images();
});

show_more_results.addEventListener("click", () => {
    load_more_images();
});


// const access_key = "rztfLv4GiR-2HaGV0yLOQHE8KBc7N8JcTJE2KjvG7Ow";

// const input_text = document.querySelector("form");
// const submit_search_btn = document.getElementById("submit_search_btn");
// const show_more_results = document.getElementById("show_more_results");
// const results_container = document.querySelector("all_search_res_container");

// let page = 1;
// let search_data = "";

// async function load_more_images () {

//     search_data = input_text.value;


//     // ! DYNAMIC URL========================================================================================================
//     const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search_data}&client_id=${access_key}`;

//     // try-catch code blocks
    
//     const response = await fetch(url);

//     try {

//         const data = await response.json();
//         const results = data.results;
//     }

//     catch (error) {
//         console.error(error)
//     }

    


//     if ( page === 1 ) {
//         results_container.textContent = "";
//     }
 
//     // ! =================== MAPPING THROUGH THE IMAGE CONTAINER ======================================================================
//     results.map((result) => {
      
//         // const result_wrapper = document.createElement("section");
//         // result_wrapper.id.add("all_search_res_container");

//         const content_container = document.createElement("div");
//         content_container.classList.add("search_container")

//         const image_container = document.createElement("div");
//         image_container.classList.add("image");
        
//         const image = document.createElement("img");
//         image.src = result.urls.small;
//         image.alt = result.alt_description;

//         const text_content_container = document.createElement("div");
//         const text = document.createElement("p");
//         text.textContent = result.alt_description;




//         content_container.appendChild(image_container);
//         image_container.appendChild(image);

//         content_container.appendChild("text_content_container");
//         text_content_container.appendChild(text);

//         results_container.appendChild(content_container);

//     }
//     );

//     page++;
    
//     if (page > 1 ) {

//         show_more_results.style.display = "block";
//     }

// }


// submit_search_btn.addEventListener( "submit", (event) => {

//     event.preventDefault();
//     page = 1;

//     // const fetching_data = document.getElementById("input_text");

//     // if ( load_more_images() ) {
//     //     fetching_data.placeholder = "Loading...";

//     // } else {
//     //     fetching_data.placeholder = "search for images";
//     // };

//     load_more_images();
// });


// show_more_results.addEventListener( "click", () => {
//     load_more_images();
// });


