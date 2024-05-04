An ui kit for VarHub games

---

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
  roomIntegrity={roomIntegrity}
  importRoomModule={() => import("varhub-modules:./game:index.ts")}
  darkMode
  onEnter={(client) => console.log("LOGGED IN WITH CLIENT",client)}
>
    <SettingsNumberParameter name={"someNumberParameter"} min={3} label="Max score"/>
    <SettingsInputParameter name={"someTextParameter"} label="ChatGPT Url"/>
    <SettingsSwitchParameter name={"someBooleanParameter"} label="Infinite game"/>
    {/** Other props */}
</VarhubSelfControlEnterPage>
```
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

