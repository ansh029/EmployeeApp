import axios from "axios";

export function getCall() {



    return axios.get('http://192.168.0.7:3001/Birlasoft')

}



export function insertCall(personName,personDesignation,personShift) {
    

    return axios.post('http://192.168.0.7:3001/Birlasoft',{
        name: personName,
        designation: personDesignation,
        shift: personShift
    })

}

export function updateCall(id,personName,personDesignation,personShift) {
    


    return axios.put('http://192.168.0.7:3001/Birlasoft/'+id,{
        name: personName,
        designation: personDesignation,
        shift: personShift
    })

}


export function deleteCall(id) {
    

    return axios.delete('http://192.168.0.7:3001/Birlasoft/'+id)

}
