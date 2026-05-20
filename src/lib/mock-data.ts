export type Model = "Midjourney" | "DALL-E" | "Stable Diffusion" | "Flux" | "Firefly"

export interface Post {
  id: string
  title: string
  image: string
  prompt: string
  fullPrompt: string
  tags: string[]
  model: Model
  likes: number
  views: number
  author: {
    id: string
    username: string
    avatar: string
    bio: string
    followers: number
    totalLikes: number
    joinDate: string
  }
  createdAt: string
  comments: Comment[]
}

export interface Comment {
  id: string
  author: { username: string; avatar: string }
  body: string
  createdAt: string
}

export const MOCK_USERS = {
  neo: {
    id: "user_neo",
    username: "neo",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&q=80",
    bio: "Digital artist obsessed with cyberpunk aesthetics and neon worlds. Building the future one prompt at a time.",
    followers: 2840,
    totalLikes: 18500,
    joinDate: "2024-01-12",
  },
  dreamweaver: {
    id: "user_dreamweaver",
    username: "dreamweaver",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80",
    bio: "Fantasy landscapes and ethereal dreamscapes. I paint with words.",
    followers: 1920,
    totalLikes: 11200,
    joinDate: "2024-03-08",
  },
  synthwave_sol: {
    id: "user_sol",
    username: "synthwave_sol",
    avatar: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=80&q=80",
    bio: "80s retro vibes meet cutting-edge AI. Vaporwave is life.",
    followers: 3200,
    totalLikes: 24000,
    joinDate: "2023-11-20",
  },
  archi_ai: {
    id: "user_archi",
    username: "archi_ai",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80",
    bio: "Architecture, interiors, and the spaces between.",
    followers: 980,
    totalLikes: 6400,
    joinDate: "2024-05-01",
  },
  robo_pal: {
    id: "user_robo",
    username: "robo_pal",
    avatar: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=80&q=80",
    bio: "3D character artist. I make robots look cute.",
    followers: 1550,
    totalLikes: 9800,
    joinDate: "2024-02-14",
  },
  fluid_arts: {
    id: "user_fluid",
    username: "fluid_arts",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=80&q=80",
    bio: "Abstract and generative art explorer. Every render is a new universe.",
    followers: 2100,
    totalLikes: 13700,
    joinDate: "2023-12-05",
  },
}

export const MOCK_POSTS: Post[] = [
  {
    id: "post_1",
    title: "Neon Cyberpunk Samurai",
    image: "https://images.unsplash.com/photo-1550684848-f38266c43784?w=800&q=80",
    prompt: "A lone samurai standing in the rain in a neon-lit Tokyo street…",
    fullPrompt:
      "A lone samurai standing in the rain in a neon-lit Tokyo street, cyberpunk aesthetic, vibrant pink and blue lights reflecting on wet pavement, cinematic composition, 8k resolution, unreal engine 5 render --ar 16:9 --v 6 --stylize 750",
    tags: ["Character", "Cyberpunk", "Night"],
    model: "Midjourney",
    likes: 3841,
    views: 24200,
    author: MOCK_USERS.neo,
    createdAt: "2025-05-10T09:12:00Z",
    comments: [
      {
        id: "c1",
        author: { username: "dreamweaver", avatar: MOCK_USERS.dreamweaver.avatar },
        body: "The rain reflection on the pavement is insane. What CFG scale did you use?",
        createdAt: "2025-05-10T11:20:00Z",
      },
      {
        id: "c2",
        author: { username: "synthwave_sol", avatar: MOCK_USERS.synthwave_sol.avatar },
        body: "The --stylize 750 makes all the difference. Bookmarked!",
        createdAt: "2025-05-10T14:55:00Z",
      },
    ],
  },
  {
    id: "post_2",
    title: "Ethereal Dreamscape",
    image: "https://images.unsplash.com/photo-1579546929518-9b42468b22be?w=800&q=80",
    prompt: "Floating islands in a pastel sky, waterfalls defying gravity…",
    fullPrompt:
      "Floating islands in a pastel sky, waterfalls defying gravity, soft volumetric lighting, dreamlike atmosphere, fantasy art, highly detailed, matte painting, concept art by James Jean --ar 3:2 --stylize 250 --v 6",
    tags: ["Landscape", "Fantasy", "Pastel"],
    model: "Midjourney",
    likes: 2190,
    views: 15800,
    author: MOCK_USERS.dreamweaver,
    createdAt: "2025-05-09T14:30:00Z",
    comments: [
      {
        id: "c3",
        author: { username: "neo", avatar: MOCK_USERS.neo.avatar },
        body: "This is pure magic. Love the James Jean reference — it really shows!",
        createdAt: "2025-05-09T16:10:00Z",
      },
    ],
  },
  {
    id: "post_3",
    title: "Retro Synthwave Car",
    image: "https://images.unsplash.com/photo-1535385793534-6a103e4e1354?w=800&q=80",
    prompt: "Red sports car driving down a palm tree highway at sunset…",
    fullPrompt:
      "Red sports car driving down a palm tree highway at sunset, retro 1980s synthwave style, orange and purple gradient sky, grid floor, chrome details, 3D render, octane render, 4k --ar 16:9 --style raw",
    tags: ["Vehicle", "Synthwave", "3D"],
    model: "DALL-E",
    likes: 4502,
    views: 31000,
    author: MOCK_USERS.synthwave_sol,
    createdAt: "2025-05-08T18:00:00Z",
    comments: [],
  },
  {
    id: "post_4",
    title: "Gothic Cathedral Interior",
    image: "https://images.unsplash.com/photo-1548625149-f3ef973b5e47?w=800&q=80",
    prompt: "Massive gothic cathedral interior, light beams through stained glass…",
    fullPrompt:
      "Massive gothic cathedral interior, light beams shining through stained glass windows, dust particles floating in air, moody dark atmosphere, photorealistic, wide angle lens, 24mm, f/1.8, dramatic shadows, golden hour light, 8k",
    tags: ["Interior", "Gothic", "Architecture"],
    model: "Stable Diffusion",
    likes: 1875,
    views: 12400,
    author: MOCK_USERS.archi_ai,
    createdAt: "2025-05-07T10:20:00Z",
    comments: [
      {
        id: "c4",
        author: { username: "fluid_arts", avatar: MOCK_USERS.fluid_arts.avatar },
        body: "The dust particles really make this feel alive. Stunning work!",
        createdAt: "2025-05-07T13:00:00Z",
      },
    ],
  },
  {
    id: "post_5",
    title: "Cute Robot Companion",
    image: "https://images.unsplash.com/photo-1535378437327-b7149b379c7a?w=800&q=80",
    prompt: "Adorable rusty robot sitting on a wooden desk next to a window…",
    fullPrompt:
      "Adorable rusty robot sitting on a wooden desk next to a window, bokeh background, warm sunlight, pixar style 3D character, big expressive eyes, cozy cottagecore setting, detailed textures, subsurface scattering, octane render --ar 1:1 --v 6",
    tags: ["3D", "Character", "Cute"],
    model: "Midjourney",
    likes: 5820,
    views: 42000,
    author: MOCK_USERS.robo_pal,
    createdAt: "2025-05-06T08:45:00Z",
    comments: [
      {
        id: "c5",
        author: { username: "neo", avatar: MOCK_USERS.neo.avatar },
        body: "I've been trying to replicate this style for weeks. Finally found the secret sauce!",
        createdAt: "2025-05-06T10:30:00Z",
      },
      {
        id: "c6",
        author: { username: "dreamweaver", avatar: MOCK_USERS.dreamweaver.avatar },
        body: "The cottagecore + robot combo is genius. Saving this forever.",
        createdAt: "2025-05-06T12:15:00Z",
      },
    ],
  },
  {
    id: "post_6",
    title: "Abstract Fluid Art",
    image: "https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80",
    prompt: "Abstract fluid art with liquid gold and deep teal colors…",
    fullPrompt:
      "Abstract fluid art with liquid gold and deep teal colors mixing together, marble texture, macro photography style, luxurious, high contrast, sharp details, glossy finish, seamless pattern, product photography lighting --ar 9:16 --style raw",
    tags: ["Abstract", "Texture", "Gold"],
    model: "DALL-E",
    likes: 2970,
    views: 19500,
    author: MOCK_USERS.fluid_arts,
    createdAt: "2025-05-05T16:00:00Z",
    comments: [],
  },
  {
    id: "post_7",
    title: "Forest Spirit Guardian",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=800&q=80",
    prompt: "Ancient forest spirit made of bark and moss, glowing runes…",
    fullPrompt:
      "Ancient forest spirit made of bark and moss, glowing runes carved into its body, bioluminescent mushrooms, enchanted forest, Studio Ghibli inspired, soft magical lighting, detailed illustration, 4k --ar 2:3 --stylize 500",
    tags: ["Fantasy", "Character", "Nature"],
    model: "Midjourney",
    likes: 3340,
    views: 22100,
    author: MOCK_USERS.dreamweaver,
    createdAt: "2025-05-04T12:00:00Z",
    comments: [],
  },
  {
    id: "post_8",
    title: "Neon Cityscape 2077",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&q=80",
    prompt: "Futuristic megacity at night, flying cars, holographic ads…",
    fullPrompt:
      "Futuristic megacity at night, flying cars weaving between skyscrapers, holographic advertisements in Japanese, rain-slicked streets below, blade runner aesthetic, wide shot, cinematic, volumetric fog, neon reflections, hyperdetailed --ar 21:9 --v 6",
    tags: ["Cityscape", "Cyberpunk", "Night"],
    model: "Flux",
    likes: 6100,
    views: 48000,
    author: MOCK_USERS.neo,
    createdAt: "2025-05-03T20:00:00Z",
    comments: [],
  },
  {
    id: "post_9",
    title: "Desert Oasis Mirage",
    image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
    prompt: "Lush oasis in a vast desert, palm trees, crystal water…",
    fullPrompt:
      "Lush oasis in a vast desert, palm trees reflected in crystal blue water, ancient ruins on the shore, golden sand dunes, cinematic wide angle, warm light, hyperrealistic, landscape photography, 8k, shot on Phase One --ar 16:9",
    tags: ["Landscape", "Desert", "Realistic"],
    model: "Stable Diffusion",
    likes: 1680,
    views: 11000,
    author: MOCK_USERS.archi_ai,
    createdAt: "2025-05-02T10:00:00Z",
    comments: [],
  },
]

export function getPostsByUser(username: string): Post[] {
  return MOCK_POSTS.filter((p) => p.author.username === username)
}

export function getPostById(id: string): Post | undefined {
  return MOCK_POSTS.find((p) => p.id === id)
}

export const ALL_TAGS = Array.from(new Set(MOCK_POSTS.flatMap((p) => p.tags)))
export const ALL_MODELS: Model[] = ["Midjourney", "DALL-E", "Stable Diffusion", "Flux", "Firefly"]
