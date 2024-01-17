const apiUrl = "https://api.github.com/search/repositories";
let currentPage = 1;
let query = "jitendra";

document.addEventListener("DOMContentLoaded", function () {
  fetchData(query);
});

const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("searchInput");
searchInput.addEventListener("input", () => {
query = searchInput.value.trim();
});

searchBtn.addEventListener("click", () => {
  if (!query) {
    return;
  } else {
    fetchData(query);
    showLoader();
  }
});

const perPage = 10;

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    fetchData(query);
  }
}

function nextPage() {
  currentPage++;
  fetchData(query);
}

async function fetchData(query) {
  try {
    const response = await fetch(
      `${apiUrl}?q=${query}&per_page=${perPage}&page=${currentPage}`
    );
    const data = await response.json();

    if (response.ok) {
      displayRepositories(data.items);
      updatePagination();
    } else {
      console.error("Error fetching data:", data.message);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    hideLoader();
  }
}

function displayRepositories(repositories) {
  const repositoriesContainer = document.querySelector(".repositories");
  repositoriesContainer.innerHTML = "";

  repositories.forEach((repo) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
            <div class="card-body">
                <h5 class="card-title">${repo.name}</h5>
                <p class="card-text">${repo.description}</p>
                <a href="${repo.html_url}" class="btn btn-primary" target="_blank">View on GitHub</a>
            </div>
        `;
    repositoriesContainer.appendChild(card);
  });
}

function updatePagination() {
  document.getElementById("currentPage").innerText = currentPage;
}

function showLoader() {
  document.querySelector(".loader").style.display = "block";
}

function hideLoader() {
  document.querySelector(".loader").style.display = "none";
}




