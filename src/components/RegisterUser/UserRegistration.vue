<template>
  <div>
    <form action="javascript:void(0)">
      <label for="email">Email Address</label>
      <input type="email" name="email" id="emailInput" />
      <label for="username">Username</label>
      <input type="text" name="username" id="usernameInput" />
      <label for="password">Password</label>
      <input type="password" name="password" id="passwordInput" />
      <label for="confirmPassword">Confirm Password</label>
      <input type="password" name="confirmPassword" id="confirmPasswordInput" />
      <label for="headline">Headline</label>
      <input type="text" name="headline" id="headline" />
      <label for="birthDate">Date Of Birth</label>
      <input
        type="date"
        name="birthDate"
        id="birthDateInput"
        value="2020-04-20"
      />
    </form>
  </div>
</template>

<script>
export default {
  name: "user-registration",
};
</script>

<style lang="scss" scoped></style>
