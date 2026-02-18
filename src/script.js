import './styles.css'; // This triggers Webpack to process the CSS
import { access_key } from "./access_key";

document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const searchBtn = document.getElementById("submit_search_btn");
    const show_more_results = document.getElementById("show_more_results");
    const results_container = document.getElementById("all_search_res_container");
    const loader = document.getElementById("loader");
    
    let page = 1;
    let search_data = "";
    let last_search_term = "";
    
        async function load_more_images () {
            search_data = form.querySelector("#input_text").value;

            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${search_data}&client_id=${access_key}`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                const results = data.results;

                // Clear results only on first page
                if (page === 1) {
                   results_container.textContent = "";
                }
                
                const noResults = results.length === 0 && page === 1;
                if (noResults) {
                    hideLoader();
                    const noResultsMessage = document.createElement("p");
                    noResultsMessage.textContent = "No results found, search for something else.";
                    noResultsMessage.classList.add("no-results-message");
                    results_container.appendChild(noResultsMessage);
                    searchBtn.disabled = false;
                    show_more_results.style.display = "none";
                    return; // Stop further execution
                }

                results.forEach((result) => {
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
                    text.textContent = result.alt_description ?? `Photo of a ${search_data}.`;

                    image_container.appendChild(image);
                    text_content_container.appendChild(text);
                    content_container.appendChild(image_container);
                    content_container.appendChild(text_content_container);
                    results_container.appendChild(content_container);
                });
                hideLoader();
                searchBtn.disabled = false;
                page++;

                if (page > 1) {
                    show_more_results.style.display = "block";
                }

            } catch (error) {
                show_more_results.style.display = "none";
                showLoader();

                setTimeout(() => {
                    hideLoader();
                    show_more_results.style.display = "none";
                    // Show a visible error message (keep loader active)
                    const errorMsg = document.createElement("p");
                    errorMsg.textContent = "Something went wrong. Please try again later.";
                    errorMsg.classList.add("error-message");
                    results_container.appendChild(errorMsg);
                    searchBtn.disabled = false;
                    last_search_term = ""

                    // Optionally: keep loader visible or retry logic
                    console.error(error);
                    throw error; // So the loader doesn't hide automatically
                }, 10_000); 
                
            }
        }

        function showLoader () {
          loader.classList.remove("hidden");
        }
        function hideLoader () {
          loader.classList.add("hidden");
        }


        form.addEventListener("submit", async (event) => {
            event.preventDefault();
            searchBtn.disabled = true;
            page = 1;
            show_more_results.style.display = "none";

            const inputField = form.querySelector("#input_text");
            const inputValue = inputField.value.trim();
            const searching_empty_input = inputValue === "";
            const input_not_edited = inputValue.toLowerCase() === last_search_term.toLowerCase();

            if (searching_empty_input) {
                hideLoader();
                searchBtn.disabled = false;
                alert("Please enter a search term.");
                return;
            }
            
            else if (input_not_edited) {
                hideLoader();
                searchBtn.disabled = false;
                alert("Please update search input to search again.");
                last_search_term = ""
                return;
            } 
            
            else {
                last_search_term = inputValue;
                search_data = inputValue;
                results_container.textContent = "";
                showLoader(); 
                await load_more_images();

            }

        });


        show_more_results.addEventListener("click", async () => {
            showLoader();
            await load_more_images();
        });

});






