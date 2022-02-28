const searchPhone = () => {
    const searchField = document.getElementById('searchField');
    const searchText = searchField.value;
    console.log(searchText);
    searchField.value = '';
}