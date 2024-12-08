<script setup lang="ts">
const { loggedIn, user, clear, fetch } = useUserSession();

const email = ref( "example@email.com" );
const password = ref( "password" );

const fileInput = ref( null );

const imagePickerModalOpen = ref( false );

async function seal() {
  try {
    await $fetch( "/api/medical-info", {
      method: "POST",
      body: {
        allergies: false,
        asthma: false,
        diabetes: false,
        epilepsy: false,
        other: false,
        details: "",
      },
    } );
  } catch ( err: any ) {
    console.error( "Error sealing", err );
  }
}

async function upload() {
  console.log( "f", fileInput.value );
  const files = fileInput.value?.input.files;
  if ( !files || files.length === 0 ) {
    console.error( "No files selected" );
    return;
  }

  const formData = new FormData();
  let i = 0;
  for ( const file of files ) {
    formData.append( `file[${ i++ }]`, file );
  }

  try {
    await $fetch( "/api/assets", {
      method: "POST",
      query: {
        // folder: "eAxTNk3zXgzZ9iHP1RZ6C"
      },
      body: formData,
    } );
  } catch ( err: any ) {
    handleFetchError( err );
  }
}

async function login() {
  try {
    await $fetch( "/api/auth/login", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    } );
    await fetch();
  } catch ( err: any ) {
    handleFetchError( err );
  }
}

async function register() {
  try {
    await $fetch( "/api/auth/register", {
      method: "POST",
      body: {
        email: email.value,
        password: password.value,
      },
    } );
    await fetch();
  } catch ( err: any ) {
    handleFetchError( err );
  }
}

const date = ref();

const selectedAsset = ref();

function onSelectedAsset( assetId: string ) {
  selectedAsset.value = assetId;
}

const form = [
  {
    type: "text",
    label: "First name",
    id: "first-name",
    key: "firstName",
    placeholder: "Enter your first name",
    required: true
  },
  {
    type: "text",
    label: "Last name",
    id: "last-name",
    key: "lastName",
    placeholder: "Enter your last name",
    required: true
  }
]

</script>

<template>
  <UContainer>
    <u-button to="/folders">
      Folders
    </u-button>
    <u-button to="/pages/foo">
      Foo page
    </u-button>
    <u-button to="/admin">
      Admin
    </u-button>
    <UCard class="mt-10">
      <div class="space-y-4">

        <UButton label="Pick image" @click="imagePickerModalOpen = true"/>
        {{ selectedAsset }}
        <pre>{{ date }}</pre>
        <DatePicker
            v-model="date"
            mode="dateTime"
        />

        <DateRangePicker/>

        <template v-if="loggedIn">
          <!--          <RichTextEditor /> -->

          <!--          <nuxt-img -->
          <!--            provider="local" -->
          <!--            width="300" -->
          <!--            height="500" -->
          <!--            format="webp" -->
          <!--            src="Tu025fMOzyDmB2oC4vvrt" -->
          <!--            :placeholder="[15, 25]" -->
          <!--          /> -->

          <u-input
              ref="fileInput"
              type="file"
              multiple
          />
          <u-button @click="upload">
            Upload
          </u-button>

          <u-button @click="fetch">
            Fetch
          </u-button>
          <u-button @click="clear">
            Logout
          </u-button>
        </template>
        <template v-else>
          <u-input
              v-model="email"
              type="email"
          />
          <u-input
              v-model="password"
              type="password"
          />

          <u-button @click="login">
            Login
          </u-button>

          <u-button @click="register">
            Register
          </u-button>
        </template>
      </div>
    </UCard>

    <AssetPickerModal v-model:open="imagePickerModalOpen"
                      :selected-asset="selectedAsset"
                      asset-type="image"
                      @selected="onSelectedAsset"/>
    <!--    <roles-tester /> -->
    
  </UContainer>
</template>
