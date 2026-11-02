import { m } from "@shared/paraglide/messages";
import { imageSizeNames, imageSizes } from "@shared/images";
import { Field, FieldDescription, FieldLabel } from "../ui/field";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import type { ImageSize } from "@shared/images";

/** Which sizes of an image to make, for uploading and remaking: the original is always there, each size can be left out. */
export function SizePicker(props: { value: ImageSize[]; onChange: (sizes: ImageSize[]) => void; disabled?: boolean }) {
    return (
        <Field>
            <FieldLabel>{m.dashboard_variants()}</FieldLabel>
            <ToggleGroup
                multiple
                variant="outline"
                value={["original", ...props.value]}
                onValueChange={(value) => props.onChange(imageSizeNames.filter((size) => value.includes(size)))}
                disabled={props.disabled}
            >
                <ToggleGroupItem value="original" disabled>original</ToggleGroupItem>
                {
                    imageSizeNames.map((size) => (
                        <ToggleGroupItem key={size} value={size} title={`${imageSizes[size]}px`}>
                            {size}
                        </ToggleGroupItem>
                    ))
                }
            </ToggleGroup>
            <FieldDescription>{m.admin_assets_variants_hint()}</FieldDescription>
        </Field>
    );
}
