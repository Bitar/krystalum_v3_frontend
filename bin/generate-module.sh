#!/bin/bash

modulePath=$1
pluralModuleName=$2

if [ -z "$modulePath" ]
then
    echo "Please provide a module name"
    exit 1
fi

# Extract the directory and module names from the full name
dirName=$(dirname "$modulePath")
moduleName=$(basename "$modulePath")

if [ "$moduleName" == "." ]
then
    echo "Please provide a module name"
    exit 1
fi

lowercaseModuleName=$(echo "$moduleName" | tr '[:upper:]' '[:lower:]')

if [ -n "$pluralModuleName" ]
then
    pluralName="$pluralModuleName"
else
    pluralName="${moduleName}s"
fi

# transform the plural name into kebabcase
kebabcasePluralName=$(echo "$pluralName" | sed 's/\([A-Z]\)/-\1/g')
kebabcasePluralName="${kebabcasePluralName#-}"
kebabcasePluralName=$(echo "$kebabcasePluralName" | tr '[:upper:]' '[:lower:]')

if [ "$dirName" == "." ]
then
    modelPath="src/app/models/$moduleName.ts"
    requestsPath="src/app/requests/$moduleName.ts"

    lowercasePluralPath=$(echo "$pluralName" | tr '[:upper:]' '[:lower:]')

    echo "Generating module $moduleName"
else
    modelPath="src/app/models/$dirName/$moduleName.ts"
    mkdir -p -v "src/app/models/$dirName" && echo "Directory 'src/app/models/$dirName' created."

    requestsPath="src/app/requests/$dirName/$moduleName.ts"
    mkdir -p -v "src/app/requests/$dirName" && echo "Directory 'src/app/requests/$dirName' created."

    lowercasePluralPath=$(echo "$dirName/$kebabcasePluralName" | tr '[:upper:]' '[:lower:]')

    echo "Generating module $moduleName inside $dirName"
fi

# we need to create the directory src/app/sections/lowercasePluralPath
# lowercasePluralPath is either test/tests or tests
mkdir -p -v "src/app/sections/$lowercasePluralPath" && echo "Directory 'src/app/sections/$lowercasePluralPath' created."

# now we need to create the directories under the section that are core, pages and partials
mkdir -p -v "src/app/sections/$lowercasePluralPath/core" && echo "Directory 'src/app/sections/$lowercasePluralPath/core' created."
mkdir -p -v "src/app/sections/$lowercasePluralPath/pages" && echo "Directory 'src/app/sections/$lowercasePluralPath/pages' created."
mkdir -p -v "src/app/sections/$lowercasePluralPath/partials" && echo "Directory 'src/app/sections/$lowercasePluralPath/partials' created."

sectionsCoreFilterFormPath="src/app/sections/$lowercasePluralPath/core/filterForm.ts"
sectionsCoreTableColumnsPath="src/app/sections/$lowercasePluralPath/core/TableColumn.tsx"
sectionsPartialsIndexFilterPath="src/app/sections/$lowercasePluralPath/partials/IndexFilter.tsx"
sectionsPagesCreatePath="src/app/sections/$lowercasePluralPath/pages/Create.tsx"
sectionsPagesEditPath="src/app/sections/$lowercasePluralPath/pages/Edit.tsx"
sectionsPagesIndexPath="src/app/sections/$lowercasePluralPath/pages/Index.tsx"

# Replace `template` with the name of your template file

# Generating Model file
cat bin/templates/model.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" > "$modelPath"

# Generating Requests file
cat bin/templates/requests.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" | sed "s/{{PLURAL_MODULE_NAME}}/$pluralName/g" | sed "s/{{LOWERCASE_MODULE_NAME}}/$lowercaseModuleName/g" | sed "s#{{LOWERCASE_PLURAL_PATH}}#$lowercasePluralPath#g" | sed "s#{{MODULE_PATH}}#$modulePath#g" > "$requestsPath"

# Generating Sections files
cat bin/templates/filterForm.txt > "$sectionsCoreFilterFormPath"

cat bin/templates/TableColumns.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" | sed "s#{{MODULE_PATH}}#$modulePath#g" | sed "s/{{LOWERCASE_MODULE_NAME}}/$lowercaseModuleName/g" | sed "s/{{PLURAL_MODULE_NAME}}/$pluralName/g" > "$sectionsCoreTableColumnsPath"

cat bin/templates/IndexFilter.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" > "$sectionsPartialsIndexFilterPath"

cat bin/templates/Create.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" | sed "s#{{MODULE_PATH}}#$modulePath#g" | sed "s/{{LOWERCASE_MODULE_NAME}}/$lowercaseModuleName/g" > "$sectionsPagesCreatePath"

cat bin/templates/Edit.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" | sed "s#{{MODULE_PATH}}#$modulePath#g" | sed "s/{{LOWERCASE_MODULE_NAME}}/$lowercaseModuleName/g" > "$sectionsPagesEditPath"

cat bin/templates/Index.txt | sed "s/{{MODULE_NAME}}/$moduleName/g" | sed "s#{{MODULE_PATH}}#$modulePath#g" | sed "s/{{LOWERCASE_MODULE_NAME}}/$lowercaseModuleName/g" | sed "s/{{PLURAL_MODULE_NAME}}/$pluralName/g" > "$sectionsPagesIndexPath"

