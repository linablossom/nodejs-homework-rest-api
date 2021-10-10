const verificationEmailTemplate = (verificationToken) => [
  "Confirm your email address",
  `<p>
        Confirm your email address by following link:
        <a href="http://localhost:3000/api/users/verify/${verificationToken}">Confirm</a>
    </p>`,
];

module.exports = {
  verificationEmailTemplate,
};
