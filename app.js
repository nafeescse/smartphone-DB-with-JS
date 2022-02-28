const searchPhone = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(dataset => loadSearch(dataset.data))
    // console.log(searchText);
    searchField.value = '';
}
searchPhone();
const loadSearch = allPhones => {
    const parent = document.getElementById('parent-container');
    parent.textContent = '';
    const phones = allPhones.slice(0, 20);
    console.log(phones);
    for (const phone of phones) {
        console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');

        div.innerHTML = `
        <div class="card rounded-lg">
                  <img src="${phone.image}" class="card-img-top w-50 mx-auto my-4">
                  <div class="card-body d-flex flex-column  align-items-center">
                  <h2> <span class="fw-bold">Brand:</span> ${phone.brand}</h2>
                  <h2> <span class="fw-bold">Model:</span> ${phone.phone_name}</h2>
                  <button class="mt-3 px-5 py-.5 rounded-xl bg-pink-600 text-white">Details</button>
                  </div>
                </div>
        `;
        parent.appendChild(div);

    }
}