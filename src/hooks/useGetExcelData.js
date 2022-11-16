import { useState, useEffect } from 'react';

const useGetExcelData = (data) => {
    const [dataCsv, setDataCsv] = useState([]);
    let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday"
    ];

    const dataToDownload = data.map((item) => {
        const creationDate = new Date(item.createdAt);
        let dayOfCreation = creationDate.toLocaleDateString(undefined, { day: "numeric" });
        dayOfCreation = Number(dayOfCreation) + 1;
        
        let restDate = creationDate.toString().slice(3, 15);
        let time = creationDate.toString().slice(16, 21);

        return {
            name: item.name,
            email: item.email,
            phone: item.phone,
            date: `${days[dayOfCreation]}, ${restDate}`,
            time: `${time}`,
            course: item.course,
            status: item.status,
            title: item.title,
            description: item.description,
            referenceName: item.reference.name,
            referencePhone: item.reference.phoneNo
        }
    });

    useEffect(() => {
        setDataCsv(dataToDownload);
    }, [dataToDownload]);

    return dataCsv;
}

export default useGetExcelData;