useEffect(() => {
    axios.get("http://people-s-plan.herokuapp.com/api/guests")
    .then((response) => {
        return response.data;
    })
    .then((data) => {
        setGuests(data)
        let objectOfIdsPerCouncil = {}
        data.forEach((guest) => {
            if (objectOfIdsPerCouncil.hasOwnProperty(guest.council)) {
                objectOfIdsPerCouncil[guest.council].push(guest.id)
            }
            else {
                objectOfIdsPerCouncil[guest.council] = [guest.id]
            }
        })
        console.log(objectOfIdsPerCouncil)
    })
}, [])