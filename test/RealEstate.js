const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('Real Estate', () => {

    let realEstate, escrow, accounts, deployer, seller;
    let nftId = 1;

    beforeEach(async()=>{
        // get the test accounts
        accounts = await ethers.getSigners()
        deployer = accounts[0]
        seller = deployer
        buyer = accounts[1]


        // Load Constracts
        const RealEstate = await ethers.getContractFactory('RealEstate');
        const Escrow = await ethers.getContractFactory('Escrow');

        // Deploy Real Estate
        realEstate = await RealEstate.deploy()
        // set up the escrow
        escrow = await Escrow.deploy(realEstate.address, nftId, seller.address, buyer.address)

        // seller approves nft transfer
        transaction = await realEstate.connect(seller).approve(escrow.address, nftId)
        await transaction.wait()
    })

    describe('Deployment', ()=>{
        it('sends and NFT to the seller / deployer', async ()=>{
            expect(await realEstate.ownerOf(nftId)).to.equal(seller.address)
        })
    })

    describe('finaliseSale()', ()=>{
        it('executes a successful trasnaction', async ()=>{
            // expects a seller to be NFT owner before sale
            expect(await realEstate.ownerOf(nftId)).to.equal(seller.address)

            transaction = await escrow.connect(buyer).finaliseSale()
            await transaction.wait()

            console.log('Buyer finalises sale')

            // expects a BUYER to be NFT owner after sale
            expect(await realEstate.ownerOf(nftId)).to.equal(buyer.address)
        })
    })
})