# About
An ui kit for VarHub games.

<details>
  <summary>Demo img</summary>
    <img src="https://github.com/flinbein/varhub-ui-kit/assets/7490341/b413cab8-707f-46db-8737-ced2f6931337" />
</details>


# How to use
## Quick example

Here is quick example:

```JSX
<VarhubGameClientProvider>

    <VarhubSelfControlEnterPage
      roomIntegrity={roomIntegrity}
      importRoomModule={() => import("varhub-modules:./game:index.ts")}
      darkMode
      onEnter={(client) => console.log("LOGGED IN WITH CLIENT",client)}
    >
        <SettingsNumberParameter name={"someNumberParameter"} min={3} label="Max score"/>
        <SettingsInputParameter name={"someTextParameter"} label="ChatGPT Url"/>
        <SettingsSwitchParameter name={"someBooleanParameter"} label="Infinite game"/>
    </VarhubSelfControlEnterPage>

    {/* ... your other application pages by some condition */}

</VarhubGameClientProvider>
```
It makes everything for you, including creating varhub client


## VarhubSelfControlEnterPage
### Props of VarhubSelfControlEnterPage
| name    |  type | required | default | description |
| -------- | ------- | ------- | ------- | -------| 
| roomIntegrity | `string` | + |  | Room's integrity. Used for joining. See official core documentation for more info |
| importRoomModule | `() => Promise<{roomIntegrity, roomModule}>` | + |  | Callback for importing game code. See official core documentation for more info |
| darkMode | `boolean` |  | `false` | Makes page dark | 
| onEnter | `(client: VarhubClient) => void` |  | `undefined` | Callback for entering room. Provides VarhubClient |

### example
```JSX
<VarhubSelfControlEnterPage
    roomIntegrity={roomIntegrity}
    importRoomModule={() => import("varhub-modules:./game:index.ts")}
    darkMode
    onEnter={(client) => console.log("LOGGED IN WITH CLIENT",client)}
/>
```
--- 
Note, that this components stores/reads state in history. But in prefer it priority state from URL 

## Settings
You can specify settings via providing Settings component as children to VarhubSelfControlEnterPage or VarhubEnterPage
```jsx
<VarhubSelfControlEnterPage
  ...
>
    <SettingsNumberParameter name={"someNumberParameter"} min={3} label="Max score"/>
    <SettingsInputParameter name={"someTextParameter"} label="Some text"/>
    <SettingsSwitchParameter name={"someBooleanParameter"} label="Some flag"/>
    {/** Other props */}
</VarhubSelfControlEnterPage>
```
Every settings-parameter will be used to fill up settings object that will be passed to room creation

### Common props of SettingsInputParameter
| name    |  type | required | default | description |
| -------- | ------- | ------- | ------- | -------| 
| name | `string` | + |  | Name for form. It will be used as key in settings object provided room creation |
| placeholder | `string` |  |  | Placeholder for input |
| label | `string` |  |  | Label for input |
| className | `string` |  |  | Classname for input wrapper |
| required | `boolean` |  | false | Makes parameter required |
| pattern | `RegExp` |  |  | Adds pattern validation for field |
| patternMessage | `string` |  | `"Invalid pattern"` | Message that will be shown if input not match pattern |


### Common props of SettingsNumberParameter
| name    |  type | required | default | description |
| -------- | ------- | ------- | ------- | -------| 
| name | `string` | + |  | Name for form. It will be used as key in settings object provided room creation |
| placeholder | `string` |  |  | Placeholder for input |
| label | `string` |  |  | Label for input |
| className | `string` |  |  | Classname for input wrapper |
| required | `boolean` |  | false | Makes parameter required |
| min | `number` |  |  | Minimum value | 
| max | `number` |  |  | Maximum value | 


### Common props of SettingsSwitcParameter
| name    |  type | required | default | description |
| -------- | ------- | ------- | ------- | -------| 
| name | `string` | + |  | Name for form. It will be used as key in settings object provided room creation |
| label | `string` |  |  | Label for input |
| className | `string` |  |  | Classname for input wrapper |


## VarhubEnterPage
If you need more control of page, you can use **VarhubEnterPage**. You need to create VarhubClient by youself: for ex. with provided function `createVarhubRoomAndClient`

```jsx
const [abortController, setAbortController] = useState<AbortController|null>(null);

const onEnterPage = useCallback(async (params: OnEnterRoomOpts) => {
    const abortController = new AbortController();
    setAbortController(abortController);
    const client = await createVarhubRoomAndClient({
        ...params,
        roomIntegrity,
        importRoomModule,
        abortController
    });
    setAbortController(null);
    onEnter(client);
}, [onEnter])

// ...
return (
    <VarhubEnterPage
        darkMode
        initialParams={params}
        onEnter={onEnterPage}
        abortController={abortController}
    >
        {children}
    </VarhubEnterPage>
)
```

### VarhubEnterPageProps
| name    |  type | required | default | description |
| -------- | ------- | ------- | ------- | -------| 
| initialParams | `VarhubEnterParams` |  |  | Name for form. It will be used as key in settings object provided room creation |
| className | `string` |  |  | Classname for page wrapper |
| darkMode | `boolean` |  | false | Makes page dark |
| onEnter | `(opts: OnEnterRoomOpts) => void` |  |  | Callback for create/join room |
| abortController | `AbortController / null` |  |  | Controls the loading state & used to canceling room creation |

```ts
export interface OnEnterRoomOpts {
    joinMode: boolean;
    serverUrl: string;
    roomId: string;
    playerName: string;
    settings?: any;
}
```

## Utils

### createVarhubRoomAndClient
An async function for create/join Varhub room.

```ts
export interface CreateRoomAndClientOpts {
    serverUrl: string; // Url with varhub-server
    playerName: string;
    roomId?: string; // If null - will create new room

    abortController: AbortController; // Will be called on timeout
    settings?: any; // Settings (config) of Varhub room

    importRoomModule: () => Promise<{roomIntegrity: string; roomModule: { main: string, source: Record<string, string>}}>; // Room module importer
    roomIntegrity: string;
}
```

Example from above:
```js
const params = {/*...*/}

const client = await createVarhubRoomAndClient({
    ...params,
    roomIntegrity,
    importRoomModule,
    abortController
});
```

### VarhubEnterParams
```ts
export interface VarhubEnterParams {
    serverUrl?: string;
    roomId?: string;
    playerName?: string;
    autoJoin?: boolean;
    settings?: any;
}
```

### getVarhubEnterParams
Gets params for entering rooom. Returns VarhubEnterParams.
Every params stored at history.state, but tries to get serverUrl and roomId from URL params first

### saveVarhubEnterParams(params: VarhubEnterParams)
Saves params to history.state

## Context ( VarhubGameClientContext )
Context stores VarhubClient. Simple useState wrapped to context.

Value can be used with hook

```jsx
const client = useVarhubGameClient();
```
