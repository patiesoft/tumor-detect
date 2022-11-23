<template>
  <v-container fluid class="blue-grey lighten-5">
    <v-app-bar dense app elevation="4">
      <v-btn
        color="primary"
        light
        size="sm"
        text
        @click="$router.push({ name: 'home' })"
        class="mx-2"
        ><v-icon>fa-arrow-left</v-icon></v-btn
      >

      <v-spacer></v-spacer>
      Patient Register
      <v-spacer></v-spacer>
    </v-app-bar>

    <v-row justify="center" align="center" class="mt-4">
      <v-col col="10" md="7" lg="5">
        <v-sheet color="white" class="pt-3" elevation="4">
          <v-form v-model="form_Is_valid" :class="formClass + ' ma-5 pt-3'">
            <v-text-field
              v-model="UserData.name"
              @blur="validateName"
              :rules="[validation.name.valid]"
              required
              type="text"
              id="name"
              label="Your name"
              aria-required
            />

            <v-text-field
              v-model="UserData.surname"
              @blur="validateSurname"
              @change="validateSurname"
              :customValidation="validation.surname.validated"
              :rules="[validation.surname.valid]"
              required
              type="text"
              outline
              id="surname"
              label="Your surname"
              aria-required
            />
            <v-row justify="center" class="my-4" align="center">
              <v-radio-group
                v-model="UserData.gender"
                row
                class="d-flex text-center pl-5 justify-content-center"
              >
                <v-radio color="primary" label="Male" value="male"></v-radio>
                <v-radio
                  color="primary"
                  label="Female"
                  value="female"
                ></v-radio>
                <v-radio color="primary" label="Other" value="other"></v-radio>
              </v-radio-group>
            </v-row>

            <!-- <hr /> -->
            <v-row
              class="form-row text-left pl-5 justify-content-between grey lighten-5"
            >
              <v-col>
                <v-text-field
                  type="number"
                  v-model="UserData.cell_number"
                  labelClass="ml-5"
                  required
                  id="phone"
                  label="Phone number"
                  aria-required
                  class="no-arrows text-center white"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              name="password"
              v-model="UserData.password"
              :customValidation="validation.password.validated"
              @blur="validatePassword"
              :rules="[validation.password.valid]"
              required
              outline
              :class="this.error.passwordmissmatchclass"
              id="password"
              label="Your password"
              invalidFeedback="Password must be at least 6 characters"
              aria-required
            >
              <span class="input-group-text" slot="append"
                ><v-btn
                  text
                  @click="showPassword = !showPassword"
                  class="m-0 p-0"
                  color="white"
                  ><v-icon>fa-{{ showPassword ? "eye" : "eye-slash" }} </v-icon>
                </v-btn></span
              >
            </v-text-field>

            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              v-model="UserData.passwordvalidator"
              @blur="validateConfirm"
              :customValidation="validation.confirm.validated"
              :rules="[validation.confirm.valid]"
              required
              :class="this.error.passwordmissmatchclass"
              outline
              id="password2"
              label="Confirm password"
              aria-required
            />

            <v-btn
              @click="sendVerificationSMS"
              id="sign-in-button"
              color="primary"
              outlined
            >
              <v-progress-circular
                v-if="ShowloadingSpinner"
                indeterminate
                color="primary"
              ></v-progress-circular>
              <span v-else-if="ShowloadingSuccess"
                ><v-icon> fa-check</v-icon> Registered
              </span>
              <span v-else
                ><v-icon size="small" left>fas fa-pen</v-icon> Register
              </span>
            </v-btn>
          </v-form>

          <p class="ml-5 mt-3 mb-5 subtitle-1">
            Have account ?
            <v-btn text dense @click="showLogin = true">login</v-btn>
          </p>
        </v-sheet>
      </v-col>
    </v-row>

    <v-dialog
      centered
      v-model="ShowloadingSpinner"
      persistent
      max-width="500px"
      @close="ShowloadingSpinner = false"
    >
      <v-card>
        <v-card-text class="m-0 p-0 grey" color="">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="ShowloadingSpinner = false" color="grey">cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Verity Phone modal -->
  </v-container>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import firebase from "firebase/app";
import { auth, Functions } from "@/plugins/firebase";
import axios from "axios";

export default {
  name: "PatientRegister",
  components: {},
  data() {
    return {
      form_Is_valid: "",
      showLogin: false,
      showPassword: false,
      modal: false,
      captureModalLoading: false,
      loading: false,
      formClass: "",
      UserData: {
        name: "",
        surname: "",
        date_of_birth: "",
        title: "",
        cell_number: "",
        email: "",
        password: "",
        passwordvalidator: "",
        gender: "other",
      },
      validation: {
        name: {
          valid: true,
          validated: false,
        },
        surname: {
          valid: true,
          validated: false,
        },
        cell: {
          valid: true,
          validated: false,
        },
        email: {
          valid: true,
          validated: false,
        },
        password: {
          valid: true,
          validated: false,
        },
        confirm: {
          valid: true,
          validated: false,
        },
      },
      countries: [
        {
          text: "Swaziland",
          value: "+268",
          icon: "https://flagcdn.com/sz.svg",
        },
        {
          text: "South Africa",
          value: "+27",
          icon: "https://flagcdn.com/za.svg",
        },
        {
          text: "Lesotho",
          value: "+266",
          icon: "https://flagcdn.com/ls.svg",
        },
        {
          text: "Botwana",
          value: "+267",
          icon: "https://flagcdn.com/bw.svg",
        },
        {
          text: "Mozambique",
          value: "+258",
          icon: "https://flagcdn.com/mv.svg",
        },
        {
          text: "Namibia",
          value: "+264",
          icon: "https://flagcdn.com/na.svg",
        },
        {
          text: "Nigeria",
          value: "+264",
          icon: "https://flagcdn.com/ng.svg",
        },
        {
          text: "United States of America",
          value: "+1",
          icon: "https://flagcdn.com/us.svg",
        },
      ],
      outlineOptions: "",
      searchValue: "",
      error: {
        show: false,
        message: "Error",
        passwordmissmatchclass: "",
      },

      ShowloadingSpinner: false,
      ShowloadingSuccess: false,
      showPhoneExistsError: false,
      allowResend: false,
    };
  },
  computed: {
    ...mapGetters("user/auth", ["getAuthObject"]),
    // ...mapGetters("user", ["getLocation"]),
    payload() {
      return {
        email: `${this.countryCode}${this.UserData.cell_number}@stokvelmutual.com`,
        password: this.UserData.password,
        name: this.UserData.name,
        surname: this.UserData.surname,
        //birthday: this.UserData.date_of_birth,
        gender: this.UserData.gender,
        phoneNumber: `${this.countryCode}${this.UserData.cell_number}`,
      };
    },

    selectedCountry() {
      let loc;
      if (
        this.countries.length !== 0 &&
        this.countries.some((e) => e.value === this.countryCode)
      ) {
        loc = this.countries.find((e) => e.value === this.countryCode);
      } else {
        if (
          this.getLocalStorageCountry === null ||
          this.getLocalStorageCountry === undefined
        ) {
          loc = {
            text: "Swaziland",
            value: "+268",
            icon: "https://flagcdn.com/sz.svg",
            selected: true,
          };
        } else {
          loc = this.getLocalStorageCountry;
        }
      }
      return loc;
    },
    getLocalStorageCountry() {
      return JSON.parse(window.localStorage.getItem("country"));
    },
  },
  methods: {
    ...mapActions("user/auth", ["signUpAction"]),
    ...mapActions("user", ["setLocation"]),
    sendVerificationSMS() {
      this.formClass = "was-validated";
      this.validateName();
      this.validateSurname();
      this.validatePassword();
      this.validateConfirm();
      this.validateCell();

      if (this.form_Is_valid) {
        this.captureModalLoading = true;
        this.modal = true;
        this.showPhoneExistsError = false;

        let checkIfNumberExists = Functions.httpsCallable(
          "checkIfNumberExists"
        );
        checkIfNumberExists({ phoneNumber: this.payload.phoneNumber })
          .then((response) => {
            console.log("checkIfNumberExists : " + response.data);
            if (response.data === true) {
              this.showPhoneExistsError = true;
              // this.modal = true;
              this.modal = false;

              this.captureModalLoading = false;
              this.validation.cell.validated = true;
              this.validation.cell.valid = false;
              return;
            } else if (response.data === false) {
              return this.requestSMSCode()
                .then((response) => {
                  this.modal = true;
                  this.captureModalLoading = false;
                  console.log("SMSRequest Successful");
                  console.log(response);
                })
                .catch((e) => {
                  this.captureModalLoading = false;
                  this.modal = false;
                  console.error("SMS error");
                  console.error(e);
                  this.$notify({
                    type: "error",
                    text: `${e}`,
                    position: "top right",
                    timeOut: 5000,
                  });
                });
            }
          })
          .catch((e) => {
            this.modal = false;
            console.error("Check Phone Error");
            console.error(e);

            this.$notify({
              type: "error",
              text: `${e}`,
              position: "top right",
              timeOut: 5000,
            });
          });
      } else {
        console.log("Check inputs");
      }
    },
    SelectOpened(isOpening) {
      if (isOpening) {
        this.fetchAllCountries();
      }
    },

    formValid() {
      if (
        this.validation.name.valid &&
        this.validation.surname.valid &&
        this.validation.cell.valid &&
        this.validation.password.valid &&
        this.validation.confirm.valid
      ) {
        return true;
      } else {
        return false;
      }
    },
    ShowError(msg) {
      this.$notify({
        type: "error",
        text: msg,
        position: "top right",
        timeOut: 5000,
      });
    },
    validateName() {
      this.validation.name.validated = true;
      if (this.UserData.name.length >= 3) {
        this.validation.name.valid = true;
      } else {
        this.validation.name.valid = false;
      }
    },
    validateSurname() {
      this.validation.surname.validated = true;
      if (this.UserData.surname.length >= 3) {
        this.validation.surname.valid = true;
      } else {
        this.validation.surname.valid = false;
      }
    },
    validateCell() {
      this.validation.cell.validated = true;
      if (this.UserData.cell_number.length !== 0) {
        this.validation.cell.valid = true;
      } else {
        this.validation.cell.valid = false;
      }
    },
    validatePassword() {
      this.validation.password.validated = true;
      if (this.UserData.password.length < 6) {
        this.validation.password.valid = false;
      } else {
        this.validation.password.valid = true;
      }
    },
    validateConfirm() {
      this.validation.confirm.validated = true;
      if (this.UserData.password != this.UserData.passwordvalidator) {
        this.validation.confirm.valid = false;
      } else {
        this.validation.confirm.valid = true;
      }
    },
    phoneSignIn() {
      return new Promise((resolve, reject) => {
        if (this.SMSVerificationCode) {
          if (!this.confirmationResult) {
            reject(new Error("The is no confirmation"));
          }
          this.confirmationResult
            .confirm(this.SMSVerificationCode)
            .then((userToken) => {
              resolve(userToken);
            })
            .catch(() => {
              reject(new Error("Incorrect Code, Please resend Code"));
              this.allowResend = true;
            });
        } else {
          reject(new Error("No SMS verification Code"));
        }
      });
    },
    linkPhoneNumberAndEmail() {
      return new Promise((resolve, reject) => {
        const credentials = firebase.auth.EmailAuthProvider.credential(
          this.payload.email,
          this.payload.password
        );
        firebase
          .auth()
          .currentUser.linkWithCredential(credentials)
          .then((userCred) => {
            resolve(userCred);
          })
          .catch((Error) => {
            reject(Error);
          });
      });
    },
    requestSMSCode() {
      return new Promise((resolve, reject) => {
        console.log("sending sms to : " + this.payload.phoneNumber);
        auth
          .signInWithPhoneNumber(
            `${this.payload.phoneNumber}`,
            window.recaptchaVerifier
          )
          .then((response) => {
            this.confirmationResult = response;
            resolve(response);
          })
          .catch((Error) => {
            reject(Error);
          });
      });
    },
    signUp() {
      this.formClass = "was-validated";
      if (this.formValid) {
        this.captureModalLoading = true;
        return this.phoneSignIn()
          .then(() => {
            return this.linkPhoneNumberAndEmail();
          })
          .then((userCredential) => {
            return this.signUpAction({
              ...this.payload,
              userId: userCredential.user.uid,
            }).then(() => {
              return auth.currentUser
                .updateProfile({
                  displayName: this.payload.name + " " + this.payload.surname,
                })
                .then(() => {
                  this.$router.push({ name: "stokvelslist" });
                  this.$notify({
                    type: "success",
                    text: "Congratulations. You have successfully registered.",
                    position: "top right",
                    timeOut: 5000,
                  });
                  this.ShowloadingSuccess = true;
                });
            });
          })
          .catch((error) => {
            this.ShowloadingSpinner = false;
            this.captureModalLoading = false;
            this.ShowError(error.message);
          });
      }
    },
    fetchAllCountries() {
      this.loading = true;
      let selected = this.getLocalStorageCountry;

      axios
        .get(
          `https://restcountries.com/v2/all?fields=name,callingCodes,currencies,flag`
        )
        .then((response) => {
          const options = response.data.map((country) => {
            return {
              text: country.name,
              value: "+" + country.callingCodes,
              icon: country.flag,
              selected: country.name === selected.name ? true : false,
            };
          });
          this.countries = [];

          this.countries = options;
          if (this.countries.length === 0) {
            this.countries.push(selected);
          }

          this.loading = false;
        })
        .catch(() => {
          this.countries = [
            {
              text: "Swaziland",
              value: "+268",
              icon: "https://flagcdn.com/sz.svg",
            },
            {
              text: "South Africa",
              value: "+27",
              icon: "https://flagcdn.com/za.svg",
            },
            {
              text: "Lesotho",
              value: "+266",
              icon: "https://flagcdn.com/ls.svg",
            },
            {
              text: "Botwana",
              value: "+267",
              icon: "https://flagcdn.com/bw.svg",
            },
            {
              text: "Mozambique",
              value: "+258",
              icon: "https://flagcdn.com/mv.svg",
            },
            {
              text: "Namibia",
              value: "+264",
              icon: "https://flagcdn.com/na.svg",
            },
            {
              text: "Nigeria",
              value: "+264",
              icon: "https://flagcdn.com/ng.svg",
            },
            {
              text: "United States of America",
              value: "+1",
              icon: "https://flagcdn.com/us.svg",
            },
          ];
          this.loading = false;
        });
    },
    UpdateLocalStorageCountry() {
      window.localStorage.setItem(
        "country",
        JSON.stringify(this.selectedCountry)
      );
    },
  },
  mounted() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: function () {
          console.log("RECAPTURED");
        },
      }
    );
    window.recaptchaVerifier.render().then((widgetId) => {
      window.recaptchaWidgetId = widgetId;
    });
    // this.fetchAllCountries();
    // window.localStorage.setItem('country',JSON.stringify(this.selectedCountry))
    // console.log(window.localStorage.getItem('country'))
  },
};
</script>
