const initializeTechnicianHomePage = async() => {
    const event = await getItemFromStore('utility','event');
    accountRec = event.account;
    showAccount();
    renderInstallationSubObjectives(event.event);
};

initializeTechnicianHomePage();