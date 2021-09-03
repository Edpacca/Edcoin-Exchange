import { UserAccount } from "../models/userAccount"
import { v4 as uuid } from 'uuid';

export const userAccounts: UserAccount[] = [
    {
        name: "Jimeny Cricket",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
    {
        name: "Donald Grump",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
    {
        name: "Lizzy Windsor",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
    {
        name: "Jemima Puddleduck",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
    {
        name: "Ronald McDonlad",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
    {
        name: "Floyd Mayoweather",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
    {
        name: "Raymond Holt",
        id: uuid(),
        balance_crypto: 0,
        balance_cash: 0,
    },
]