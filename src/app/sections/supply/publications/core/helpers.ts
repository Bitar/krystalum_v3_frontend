import {Format} from '../../../../models/misc/Format'
import {Publication} from '../../../../models/supply/publication/Publication'

export const checkFormats = (
  publication: Publication,
  formats: Format[],
  formatId: number,
  type: string
) => {
  // we need to check if the formats of the publications include 'All Formats'
  const allFormatExists = publication.formats?.find(
    (publicationFormat) => publicationFormat.format.name === 'All Formats'
  )

  // get the selected format object
  const selectedFormat = formats.find((format) => format.id === formatId)

  // 'All Formats' exists for this publication
  // then, the format should be ignored
  if (allFormatExists && allFormatExists.type.id === type && selectedFormat) {
    return `The publication already includes an entry for 'All Formats' with the type '${type}' in its formats.
             Therefore, we have not added the requested formats (${selectedFormat.name}) with the type '${type}' since the 
             'All Formats' format already encompasses them with the same type. 
             Hence, there is no need to add them again`
  }

  const publicationFormatExists = publication.formats?.find(
    (publicationFormat) => publicationFormat.format.id === formatId
  )

  if (publicationFormatExists && publicationFormatExists.type.id === type) {
    return `The selected format '${publicationFormatExists.format.name}' with type '${type}' already exists.`
  }

  const parentFormat = selectedFormat?.parent

  if (parentFormat) {
    // the format is a child
    const parentPublicationFormatExists = publication.formats?.find(
      (publicationFormat) => publicationFormat.format.id === parentFormat?.id
    )

    if (
      parentPublicationFormatExists &&
      parentPublicationFormatExists.type.id === type &&
      publicationFormatExists
    ) {
      return ''
    } else {
      if (parentPublicationFormatExists) {
        return `The selected format '${selectedFormat.name}' belongs to the '${parentPublicationFormatExists.format.name}' format, which already exists with the specified type '${type}'`
      }

      return ''
    }
  }

  let message = ''

  // the format is a parent
  formats.some((childFormat) => {
    const publicationChildFormat = publication.formats?.find(
      (publicationFormat) =>
        publicationFormat.format.id === childFormat.id && publicationFormat.type.id === type
    )

    if (publicationChildFormat !== undefined) {
      message = `The selected format '${publicationChildFormat.format.name}' with type '${type}' already exists.`
    }

    message = ''
  })

  return message
}
