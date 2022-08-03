def find_tier_image(tier: str) -> str:
    tier_image = {
        "1000": "https://images.unsplash.com/photo-1605559911410-964703217ee6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MXxzZWFyY2h8NHx8YmxhY2slMjBtb25rZXl8fDB8fHx8MTYyNTY3MjAwMw&ixlib=rb-1.2.1&q=80&w=1080",
        "2000": "https://www.bates.edu/news/files/2013/02/Cercopithecus-hamlyni0044271.g004.jpg",
        "3000": "https://vignette.wikia.nocookie.net/naturerules1/images/8/83/Proboscis-monkey-1X1.jpg/revision/latest?cb=20190322195933",
    }
    return tier_image.get(tier, "https://i.redd.it/6x9qh7b1st1y.jpg")


def find_raid_image(raid_count: int) -> str:
    return "https://cdn.britannica.com/30/143530-050-944C363C/Swamp-monkey.jpg"
