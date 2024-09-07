module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
    },
    moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|webp|svg)$': 'jest-transform-stub',
        '^.+\\.(css|less)$': '<rootDir>csstub.js'
    },
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};