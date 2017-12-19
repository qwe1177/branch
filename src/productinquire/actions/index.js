import axios from 'axios';

export const tablemodelInfo = 'tablemodelInfo'

export const tablemodelaction = value=> ({
    type: tablemodelInfo,
    payload: value
})

