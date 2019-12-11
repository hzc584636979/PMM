const config = {
    ABI: [
        {
            "constant": false,
            "inputs": [
                {
                    "name": "freezeAmount",
                    "type": "uint256"
                }
            ],
            "name": "againBet",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "name": "iC",
                    "type": "string"
                },
                {
                    "name": "beIC",
                    "type": "string"
                }
            ],
            "name": "bet",
            "outputs": [],
            "payable": true,
            "stateMutability": "payable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "name": "uA",
                    "type": "address"
                }
            ],
            "name": "getUserByAddress",
            "outputs": [
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "string"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                },
                {
                    "name": "",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "drawBalance",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [],
            "name": "drawTutorBless",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
    ],
    address: "0x11d448e765a8e2781054ea94a9fb58e4b7bbe182",
};

const selectDesc = {
    1: {
        min: 1,
        max: 5,
        profit: '0.6%',
        day: 10
    },
    2: {
        min: 6,
        max: 10,
        profit: '0.8%',
        day: 15
    },
    3: {
        min: 11,
        max: 15,
        profit: '1.2%',
        day: 25
    }
};


export default config;
export { 
    selectDesc,
}