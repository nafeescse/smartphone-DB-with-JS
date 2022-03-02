// Function for searching phones
const searchPhone = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;

    if (searchField.value == '') {
        swal({
            title: "Oppps !!",
            text: "Please search something!",
            icon: "warning",
            button: "Okay",
        })
    }
    else {
        document.getElementById('spinner').style.display = 'block';
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(dataset => loadSearch(dataset.data))

        searchField.value = '';
    }
}

// Function for display search results
const loadSearch = allPhones => {
    document.getElementById('spinner').style.display = 'none';
    if (allPhones.length === 0) {
        swal({
            title: "Sorry !!!",
            text: "No phone's found!",
            icon: "warning",
            button: "Try Again",
        });
    } else {
        const status = document.getElementById('status');
        status.textContent = '';
        const p = document.createElement('p');
        p.classList.add('h4');
        const parent = document.getElementById('parent-container');
        parent.textContent = '';
        const phones = allPhones.slice(0, 20);
        p.innerText = `Showing ${phones.length}  results out of ${allPhones.length}`;
        status.appendChild(p);
        for (const phone of phones) {
            // console.log(phone);
            const div = document.createElement('div');
            div.classList.add('col');
            div.innerHTML = `
        <div class="card rounded-lg">
                  <img src="${phone.image}" class="card-img-top w-50 mx-auto my-4">
                  <div class="card-body d-flex flex-column  align-items-center">
                  <h2> <span class="fw-bold">Brand:</span> ${phone.brand}</h2>
                  <h2> <span class="fw-bold">Model:</span> ${phone.phone_name}</h2>
                  <a href="#view"><button onclick='detailsLoad("${phone.slug}")' class="mt-3 px-5 py-0.5 rounded-xl bg-pink-600 text-white">Details</button></a>
                  </div>
                </div>
        `;
            parent.appendChild(div);
        }
    }
}

// Function for fetch result details
const detailsLoad = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(dataset => displayDetails(dataset.data))
}

// Function for display details
const displayDetails = details => {
    const display = document.getElementById('details-card');
    display.textContent = '';
    const div = document.createElement('div');
    div.innerHTML = `
    <div class="row rounded-lg border-3 border-danger">
    <div class="col-12 col-lg-4 bg-white ">
        <img src="${details.image}" class=" w-1/2 lg:w-3/4 mx-auto my-4">
    </div>
    <div class="col-12 col-lg-8 my-auto py-2">
        <div>
            <h3> <span class="fw-bold">Brand:</span> ${details.brand}.</h3>
            <h3> <span class="fw-bold">Model:</span> ${details.name}.</h3>
            <h3> <span class="fw-bold">Release :</span> ${details?.releaseDate ? details?.releaseDate : 'Not Found'}.</h3>
            <h3> <span class="fw-bold">Bluetooth:</span> ${details.others?.Bluetooth ? details.others?.Bluetooth : "Not found"}.</h3>
            <h3> <span class="fw-bold">WLAN:</span> ${details.others?.WLAN ? details.others?.WLAN : 'Not found'}.</h3>
            <h3> <span class="fw-bold">GPS:</span> ${details.others?.GPS ? details.others?.GPS : 'Not found'}.</h3>
            <h3> <span class="fw-bold">USB:</span> ${details?.others?.USB ? details?.others?.USB : 'Not found'}.</h3>
            <h3> <span class="fw-bold">Display:</span> ${details?.mainFeatures?.displaySize}.</h3>
            <h3> <span class="fw-bold">ChipSet:</span> ${details?.mainFeatures?.chipSet}.</h3>
            <h3> <span class="fw-bold">Sensors:</span> ${details?.mainFeatures?.sensors}.</h3>
            <h3> <span class="fw-bold">Storage:</span> ${details?.mainFeatures?.storage}.</h3>
            <h3> <span class="fw-bold">Memory:</span> ${details?.mainFeatures?.memory}.</h3>
            
        </div>
    </div>
</div>
        `;
    display.appendChild(div);

}

