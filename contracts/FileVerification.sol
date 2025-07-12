// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract FileVerification {
    mapping(bytes32 => bool) public fileHashes;

    event FileUploaded(bytes32 indexed hash);

    function uploadFile(bytes32 hash) public {
        require(!fileHashes[hash], "File already uploaded");
        fileHashes[hash] = true;
        emit FileUploaded(hash);
    }

    function verifyFile(bytes32 hash) public view returns (bool) {
        return fileHashes[hash];
    }
}