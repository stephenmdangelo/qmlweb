import QtQuick 2.0

Item {
    Column {
        spacing: 16
        Repeater {
            model: ListModel {
                ListElement {
                    name: "page 1"
                }
                ListElement {
                    name: "page 2"
                }
            }

            Column {
                id: foo_delegate
                DebugItem {
                    property string foo1_text: name + index
                    text: name + index
                }
                Text {
                    property string foo2_text: name + index
                    text: name + index
                }
            }
        }
    }
}
