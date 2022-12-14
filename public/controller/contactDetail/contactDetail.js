let contactRec = {};
let account;
const initializeContactDetailPage =async () => {
    let urlParams = new URLSearchParams(window.location.search);

    const accountId = urlParams.get('accountId');
    const contactId = urlParams.get('contactId');

    account = await getItemFromStore('account',accountId);
    $(`#Account`).prop("value",account.Name);
    document.getElementById('Account').setAttribute('readonly', true); 
    contactRec = (account.Contacts.records.filter(ele => {
       return ele.Id === contactId;
    }))[0];
    console.log(contactRec);
    initializeContact();

};

const handleSaveSubmitContact = async() => {
    await writeData('contactsync',contactRec);
    let index = account.Contacts.records.findIndex(ele => ele.Id===contactRec.Id);
    account.Contacts.records.splice(index,1,contactRec);
    await writeData('account',account);
    history.go(-1); 
    return false;
};


initializeContactDetailPage();  