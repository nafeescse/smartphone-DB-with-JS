const searchPhone = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;

    if (searchField.value == '') {
        window.alert('Please search something...')
    }
    else {
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(dataset => loadSearch(dataset.data))

        searchField.value = '';
    }
}
// searchPhone();
const loadSearch = allPhones => {
    if (allPhones.length === 0) {
        window.alert("No phone's Found !!")
    } else {
        const status = document.getElementById('status');
        status.textContent = '';
        const p = document.createElement('p');
        p.classList.add('h4');

        // console.log(allPhones);
        const parent = document.getElementById('parent-container');
        parent.textContent = '';
        const phones = allPhones.slice(0, 20);
        p.innerText = `Showing ${phones.length}  results out of ${allPhones.length}`;
        status.appendChild(p);
        // console.log(phones);
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
                  <button onclick='detailsLoad("${phone.slug}")' class="mt-3 px-5 py-0.5 rounded-xl bg-pink-600 text-white">Details</button>
                  </div>
                </div>
        `;
            parent.appendChild(div);
        }
    }
}

const detailsLoad = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(dataset => displayDetails(dataset.data))
    // console.log(id);
}

const displayDetails = details => {
    console.log(details);

    const display = document.getElementById('details-card');
    const div = document.createElement('div');
    // div.classList.add('div');
    div.innerHTML = `
                <div class="row card rounded-lg ">
                <div class="col">
                <img src="${details.image}" class="card-img-top w-25 mx-auto my-4">
                </div>
                <div class="col">
                <div class="card-body d-flex flex-column  align-items-center">
                <h2> <span class="fw-bold">Brand:</span> ${details.brand}</h2>
                <h2> <span class="fw-bold">Model:</span> ${details.name}</h2>
                <h2> <span class="fw-bold">Release :</span> ${details.releaseDate}</h2>
                <h2> <span class="fw-bold">Bluetooth:</span> ${details.others.Bluetooth}</h2>
                <h2> <span class="fw-bold">Sensors:</span> ${details.mainFeatures.sensors}</h2>
                </div>
                </div>
                </div>
        `;
    display.appendChild(div);

}