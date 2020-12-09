<template>
    <div class="row">
        <div class="col-md-3">
            <small-box
                color="bg-blue"
                title="120"
                icon="fa fa-bar-chart"
                subtitle="Visitors"/>
        </div>
        <div class="col-md-3">
            <small-box
                color="bg-green"
                title="30"
                icon="fa fa-pie-chart"
                subtitle="Views"/>
        </div>
        <div class="col-md-3">
            <small-box
                color="bg-yellow"
                title="150"
                icon="fa fa-user"
                subtitle="Users"/>
        </div>
        <div class="col-md-3">
            <small-box
                color="bg-red"
                title="56"
                icon="fa fa-info-circle"
                subtitle="Errors"
                footer_text="Goto Dashboard"
                :route="{name: 'dashboard'}"/>
        </div>

        <div class="col-md-12">

            <small-box-group :items="items"/>

        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            items: [
                {
                    color: "bg-blue",
                    title: "120",
                    icon: "fa fa-bar-chart",
                    subtitle: "Visitors",
                }, {
                    color: "bg-green",
                    title: "30",
                    icon: "fa fa-pie-chart",
                    subtitle: "Views",
                }, {
                    color: "bg-yellow",
                    title: "150",
                    icon: "fa fa-user",
                    subtitle: "Users",
                }, {
                    color: "bg-red",
                    title: "56",
                    icon: "fa fa-info-circle",
                    subtitle: "Errors",
                    footer_text: "Goto Dashboard",
                    route: {
                        name: 'dashboard'
                    }
                }
            ]
        }
    }
}
</script>
