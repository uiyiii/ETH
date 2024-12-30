const fs = require('fs');
const path = require('path');

module.exports = async function(callback) {
    try {
        const dataPath = path.join(__dirname, 'test.txt');
        const data = fs.readFileSync(dataPath, 'utf8').split('\n');
        const SimpleStorage = artifacts.require("SimpleStorage");
        const contract = await SimpleStorage.deployed();
        
        let previousTimestamp = 0;

        for (let i = 0; i < data.length; i++) {
            if (data[i].trim() !== '') {
                const value = parseInt(data[i].trim(), 10);
                
                // トランザクションの送信前の時刻をミリ秒単位で記録
                const startTime = Date.now();

                const response = await contract.set(value);
                const txReceipt = await web3.eth.getTransactionReceipt(response.tx);
                const block = await web3.eth.getBlock(txReceipt.blockNumber);

                // トランザクションの送信後の時刻をミリ秒単位で記録
                const endTime = Date.now();

                // トランザクションの処理時間を計算
                const processingTime = endTime - startTime;
                console.log(`Transaction processing time: ${processingTime} milliseconds`);

                // 前回のブロックタイムスタンプとの比較
                if (previousTimestamp !== 0) {
                    const blockTime = block.timestamp - previousTimestamp;
                    console.log(`Block ${block.number} generated ${blockTime} seconds after previous block.`);
                }

                previousTimestamp = block.timestamp;
                console.log(`Transaction was in block number: ${txReceipt.blockNumber}`);
                console.log('Block details:', block);
            }
        }
    } catch (error) {
        console.error('Error:', error);
    }
    callback();
};