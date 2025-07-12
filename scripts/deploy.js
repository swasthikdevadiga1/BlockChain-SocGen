const fs = require('fs');

async function main() {
    const FileVerification = await ethers.getContractFactory("FileVerification");
    
    console.log("Deploying FileVerification...");
    const fileVerification = await FileVerification.deploy();
    
    console.log("Waiting for deployment to complete...");
    await fileVerification.waitForDeployment();
    
    console.log("FileVerification deployed to:", fileVerification.target);

    const envPath = '.env';
    let envContent = '';

    if (fs.existsSync(envPath)) {
        envContent = fs.readFileSync(envPath, 'utf8');
    }

    const lines = envContent.split('\n');
    let found = false;
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('CONTRACT_ADDRESS=')) {
            lines[i] = `CONTRACT_ADDRESS=${fileVerification.target}`;
            found = true;
            break;
        }
    }

    if (!found) {
        lines.push(`CONTRACT_ADDRESS=${fileVerification.target}`);
    }

    fs.writeFileSync(envPath, lines.join('\n'));
    console.log('Contract address saved to .env');
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });