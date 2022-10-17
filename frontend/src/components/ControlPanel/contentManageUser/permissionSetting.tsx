import { HStack, Switch, FormControl, FormLabel } from '@chakra-ui/react'
import type { Permission } from './ManageUser'

type Props = {
    permissions: Permission[]
    changePermission: (name: string) => void
}

export default function PermissionSetting(props: Props) {
    return (
        <>
            {props.permissions.map((permission: Permission, idx: number) => (
                <HStack key={idx} w="90%" px="5px" py="3px">
                    <FormControl
                        display="flex"
                        justifyContent={'space-between'}
                    >
                        <FormLabel htmlFor="visibleByOthers" mb="0">
                            {permission.displayName}
                        </FormLabel>
                        {permission.value ? (
                            <Switch
                                id={'permission_' + permission.name}
                                colorScheme="teal"
                                size="md"
                                defaultChecked
                                isChecked={permission.value}
                                onChange={() =>
                                    props.changePermission(permission.name)
                                }
                            />
                        ) : (
                            <Switch
                                id={'permission_' + permission.name}
                                colorScheme="teal"
                                size="md"
                                isChecked={permission.value}
                                onChange={() => {
                                    props.changePermission(permission.name)
                                }}
                            />
                        )}
                    </FormControl>
                </HStack>
            ))}
        </>
    )
}
