module.exports = {
    transform: {
        '^.+\\.[t|j]sx?$': 'babel-jest',
        "^.+\\.svg$": "jest-transformer-svg"
    },
    moduleNameMapper: {
        '^.+\\.(jpg|jpeg|png|gif|webp)$': 'jest-transform-stub',
        '^.+\\.(css|less)$': '<rootDir>csstub.js',
    },
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ["<rootDir>/node_modules/"],
};